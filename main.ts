function 检测障碍 (左右: number) {
    if (左右 == 0) {
        if (pins.analogReadPin(AnalogPin.P0) < 阈值) {
            return 1
        }
    } else if (左右 == 1) {
        if (pins.analogReadPin(AnalogPin.P1) < 阈值) {
            return 1
        }
    } else {
        if (pins.analogReadPin(AnalogPin.P0) < 阈值 || pins.analogReadPin(AnalogPin.P1) < 阈值) {
            return 1
        }
    }
    return 0
}
function 直行 (前进后退: number) {
    if (前进后退 == 0) {
        pins.analogWritePin(AnalogPin.P4, 0)
        pins.analogWritePin(AnalogPin.P10, 1023)
        pins.analogWritePin(AnalogPin.P2, 0)
        pins.analogWritePin(AnalogPin.P3, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P4, 1023)
        pins.analogWritePin(AnalogPin.P10, 0)
        pins.analogWritePin(AnalogPin.P2, 1023)
        pins.analogWritePin(AnalogPin.P3, 0)
    }
}
input.onButtonPressed(Button.A, function () {
    for (let index = 0; index < 10; index++) {
        if (需要停车 == 1) {
            停车()
            需要停车 = 0
            break;
        }
        直行(0)
        basic.pause(200)
        转弯(0)
        basic.pause(200)
        直行(0)
        basic.pause(200)
        转弯(1)
        basic.pause(200)
        if (检测障碍(2) == 1) {
            直行(1)
            basic.pause(500)
            转圈(1)
            basic.pause(500)
        }
    }
    停车()
})
function 停车 () {
    pins.analogWritePin(AnalogPin.P4, 0)
    pins.analogWritePin(AnalogPin.P10, 0)
    pins.analogWritePin(AnalogPin.P2, 0)
    pins.analogWritePin(AnalogPin.P3, 0)
}
function 转圈 (左右: number) {
    if (左右 == 0) {
        pins.analogWritePin(AnalogPin.P4, 0)
        pins.analogWritePin(AnalogPin.P10, 1023)
        pins.analogWritePin(AnalogPin.P2, 1023)
        pins.analogWritePin(AnalogPin.P3, 0)
    } else {
        pins.analogWritePin(AnalogPin.P4, 1023)
        pins.analogWritePin(AnalogPin.P10, 0)
        pins.analogWritePin(AnalogPin.P2, 0)
        pins.analogWritePin(AnalogPin.P3, 1023)
    }
}
function test () {
    直行(0)
    basic.pause(2000)
    停车()
}
input.onButtonPressed(Button.B, function () {
    需要停车 = 1
})
function 转弯 (左右: number) {
    if (左右 == 0) {
        pins.analogWritePin(AnalogPin.P4, 0)
        pins.analogWritePin(AnalogPin.P10, 1023)
        pins.analogWritePin(AnalogPin.P2, 0)
        pins.analogWritePin(AnalogPin.P3, 500)
    } else {
        pins.analogWritePin(AnalogPin.P4, 0)
        pins.analogWritePin(AnalogPin.P10, 500)
        pins.analogWritePin(AnalogPin.P2, 0)
        pins.analogWritePin(AnalogPin.P3, 1023)
    }
}
let 需要停车 = 0
let 阈值 = 0
led.enable(false)
pins.analogSetPeriod(AnalogPin.P4, 2000)
pins.analogSetPeriod(AnalogPin.P10, 2000)
pins.analogSetPeriod(AnalogPin.P2, 2000)
pins.analogSetPeriod(AnalogPin.P3, 2000)
阈值 = 100
需要停车 = 0
