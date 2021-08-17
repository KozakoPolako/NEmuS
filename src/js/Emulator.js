import Raven from "raven-js";
import { NES } from "jsnes";
import FrameTimer from "./FrameTimer";
import Screen from "./Screen";
import Speakers from "./Speakers";
import KeyboardController from "./KeyboardController";

export default class Emulator {
    constructor(display) {
        this.screen = new Screen(document.querySelector(display));

        this.speakers = new Speakers({
            onBufferUnderrun: (actualSize, desiredSize) => {
                if (this.props.paused) {
                    return;
                }
                // Skip a video frame so audio remains consistent. This happens for
                // a variety of reasons:
                // - Frame rate is not quite 60fps, so sometimes buffer empties
                // - Page is not visible, so requestAnimationFrame doesn't get fired.
                //   In this case emulator still runs at full speed, but timing is
                //   done by audio instead of requestAnimationFrame.
                // - System can't run emulator at full speed. In this case it'll stop
                //    firing requestAnimationFrame.
                console.log(
                    "Buffer underrun, running another frame to try and catch up"
                );
                this.frameTimer.generateFrame();
                if (this.speakers.buffer.size() < desiredSize) {
                    console.log("Still buffer underrun, running a second frame");
                    this.frameTimer.generateFrame();
                }
            }
        });

        this.nes = new NES({
            onFrame: this.screen.setBuffer,
            onStatusUpdate: console.log,
            onAudioSample: this.speakers.writeSample,
            sampleRate: this.speakers.getSampleRate()
        });

        this.frameTimer = new FrameTimer({
            onGenerateFrame: Raven.wrap(this.nes.frame),
            onWriteFrame: Raven.wrap(this.screen.writeBuffer)
        });
        this.keyboardController = new KeyboardController({
            onButtonDown: this.nes.buttonDown,
            onButtonUp: this.nes.buttonUp
        });

        this.keyboardController.loadKeys();

        document.addEventListener("keydown", this.keyboardController.handleKeyDown);
        document.addEventListener("keyup", this.keyboardController.handleKeyUp);
        document.addEventListener(
            "keypress",
            this.keyboardController.handleKeyPress
        );



    }
    loadGame(game) {

        const reader = new FileReader();
        reader.readAsBinaryString(game);

        reader.onload = (e) => {
            this.nes.loadROM(e.target.result);
        };
        reader.onerror = (e) => {
            console.log(e.target.error);
        }

    }

    start() {
        this.frameTimer.start();
        this.speakers.start();
    }
}