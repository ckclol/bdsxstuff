"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomForm = exports.ModalForm = exports.SimpleForm = exports.Form = exports.FormInput = exports.FormDropdown = exports.FormStepSlider = exports.FormSlider = exports.FormToggle = exports.FormLabel = exports.FormButton = void 0;
const bdsx_1 = require("bdsx");
const event_1 = require("../event");
const packets_1 = require("./packets");
const formMaps = new Map();
// rua.kr: I could not find the internal form id counter, It seems BDS does not use the form.
//         But I set the minimum for the unexpected situation.
const MINIMUM_FORM_ID = 0x10000000;
const MAXIMUM_FORM_ID = 0x7fffffff; // 32bit signed integer maximum
let formIdCounter = MINIMUM_FORM_ID;
class SentForm {
    constructor(networkIdentifier, resolve, reject) {
        this.networkIdentifier = networkIdentifier;
        this.resolve = resolve;
        this.reject = reject;
        // allocate id without dupication
        for (;;) {
            const id = formIdCounter++;
            if (formIdCounter >= MAXIMUM_FORM_ID)
                formIdCounter = MINIMUM_FORM_ID;
            // logically it will enter the infinity loop when it fulled. but technically it will crash by out of memory before
            if (!formMaps.has(id)) {
                formMaps.set(id, this);
                this.id = id;
                break;
            }
        }
    }
}
class FormButton {
    constructor(text, imageType, imagePath = "") {
        this.text = text;
        if (imageType) {
            this.image = {
                type: imageType,
                data: imagePath,
            };
        }
    }
}
exports.FormButton = FormButton;
class FormComponent {
    constructor(text) {
        this.text = text;
    }
}
class FormLabel extends FormComponent {
    constructor(text) {
        super(text);
        this.type = "label";
    }
}
exports.FormLabel = FormLabel;
class FormToggle extends FormComponent {
    constructor(text, defaultValue) {
        super(text);
        this.type = "toggle";
        if (defaultValue)
            this.default = defaultValue;
    }
}
exports.FormToggle = FormToggle;
class FormSlider extends FormComponent {
    constructor(text, min, max, step, defaultValue) {
        super(text);
        this.type = "slider";
        this.min = min;
        this.max = max;
        if (step)
            this.step = step;
        if (defaultValue)
            this.default = defaultValue;
    }
}
exports.FormSlider = FormSlider;
class FormStepSlider extends FormComponent {
    constructor(text, steps, defaultIndex) {
        super(text);
        this.type = "step_slider";
        this.steps = steps;
        if (defaultIndex)
            this.default = defaultIndex;
    }
}
exports.FormStepSlider = FormStepSlider;
class FormDropdown extends FormComponent {
    constructor(text, options, defaultIndex) {
        super(text);
        this.type = "dropdown";
        this.options = options;
        if (defaultIndex)
            this.default = defaultIndex;
    }
}
exports.FormDropdown = FormDropdown;
class FormInput extends FormComponent {
    constructor(text, placeholder, defaultValue) {
        super(text);
        this.type = "input";
        if (placeholder)
            this.placeholder = placeholder;
        if (defaultValue)
            this.default = defaultValue;
    }
}
exports.FormInput = FormInput;
class Form {
    constructor(data) {
        this.data = data;
        this.externalLoading = false;
        this.labels = new Map();
    }
    static sendTo(target, data) {
        return new Promise((resolve, reject) => {
            var _a;
            const submitted = new SentForm(target, resolve, reject);
            const pk = packets_1.ShowModalFormPacket.create();
            pk.id = submitted.id;
            pk.content = JSON.stringify(data);
            pk.sendTo(target);
            pk.dispose();
            const formdata = data;
            if (formdata.type === 'form') {
                if (formdata.buttons !== undefined) {
                    for (const button of formdata.buttons) {
                        if (((_a = button.image) === null || _a === void 0 ? void 0 : _a.type) === "url") {
                            setTimeout(() => {
                                const pk = packets_1.SetTitlePacket.create();
                                pk.sendTo(target);
                                pk.dispose();
                            }, 1000);
                            break;
                        }
                    }
                }
            }
        });
    }
    sendTo(target, callback) {
        const submitted = new SentForm(target, res => {
            if (callback === undefined)
                return;
            switch (this.data.type) {
                case "form":
                    this.response = this.labels.get(res) || res;
                    break;
                case "modal":
                    this.response = res;
                    break;
                case "custom_form":
                    this.response = res;
                    if (res !== null) {
                        for (const [index, label] of this.labels) {
                            res[label] = res[index];
                        }
                    }
                    break;
            }
            callback(this, target);
        }, err => {
            throw err;
        });
        const pk = packets_1.ShowModalFormPacket.create();
        pk.id = submitted.id;
        pk.content = JSON.stringify(this.data);
        pk.sendTo(target);
        pk.dispose();
        if (this.externalLoading) {
            setTimeout(() => {
                const pk = packets_1.SetTitlePacket.create();
                pk.sendTo(target);
                pk.dispose();
            }, 1000);
        }
        return pk.id;
    }
    toJSON() {
        return this.data;
    }
}
exports.Form = Form;
class SimpleForm extends Form {
    constructor(title = "", content = "", buttons = []) {
        var _a;
        super({
            type: 'form',
            title,
            content,
            buttons
        });
        for (const button of buttons) {
            if (((_a = button.image) === null || _a === void 0 ? void 0 : _a.type) === "url")
                this.externalLoading = true;
        }
    }
    getTitle() {
        return this.data.title;
    }
    setTitle(title) {
        this.data.title = title;
    }
    getContent() {
        return this.data.content;
    }
    setContent(content) {
        this.data.content = content;
    }
    addButton(button, label) {
        var _a;
        this.data.buttons.push(button);
        if (((_a = button.image) === null || _a === void 0 ? void 0 : _a.type) === "url")
            this.externalLoading = true;
        if (label)
            this.labels.set(this.data.buttons.length - 1, label);
    }
    getButton(indexOrLabel) {
        if (typeof indexOrLabel === "string") {
            for (const [index, label] of this.labels) {
                if (label === indexOrLabel)
                    return this.data.buttons[index];
            }
        }
        else {
            return this.data.buttons[indexOrLabel];
        }
        return null;
    }
}
exports.SimpleForm = SimpleForm;
class ModalForm extends Form {
    constructor(title = "", content = "") {
        super({
            type: 'modal',
            title,
            content,
            button1: '',
            button2: '',
        });
    }
    getTitle() {
        return this.data.title;
    }
    setTitle(title) {
        this.data.title = title;
    }
    getContent() {
        return this.data.content;
    }
    setContent(content) {
        this.data.content = content;
    }
    getButtonConfirm() {
        return this.data.button1;
    }
    setButtonConfirm(text) {
        this.data.button1 = text;
    }
    getButtonCancel() {
        return this.data.button2;
    }
    setButtonCancel(text) {
        this.data.button2 = text;
    }
}
exports.ModalForm = ModalForm;
class CustomForm extends Form {
    constructor(title = "", content = []) {
        super({
            type: 'custom_form',
            title,
            content: content
        });
    }
    getTitle() {
        return this.data.title;
    }
    setTitle(title) {
        this.data.title = title;
    }
    addComponent(component, label) {
        this.data.content.push(component);
        if (label)
            this.labels.set(this.data.content.length - 1, label);
    }
    getComponent(indexOrLabel) {
        if (typeof indexOrLabel === "string") {
            for (const [index, label] of this.labels) {
                if (label === indexOrLabel)
                    return this.data.content[index];
            }
        }
        else {
            return this.data.content[indexOrLabel];
        }
        return null;
    }
}
exports.CustomForm = CustomForm;
event_1.events.packetAfter(bdsx_1.MinecraftPacketIds.ModalFormResponse).on((pk, ni) => {
    const sent = formMaps.get(pk.id);
    if (sent === undefined)
        return;
    if (sent.networkIdentifier !== ni)
        return; // other user is responsing
    formMaps.delete(pk.id);
    try {
        const response = JSON.parse(pk.response);
        sent.resolve(response);
    }
    catch (err) {
        sent.reject(err);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQXNFO0FBQ3RFLG9DQUFrQztBQUNsQyx1Q0FBZ0U7QUFFaEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7QUFFN0MsNkZBQTZGO0FBQzdGLDhEQUE4RDtBQUM5RCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUM7QUFDbkMsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLENBQUMsK0JBQStCO0FBRW5FLElBQUksYUFBYSxHQUFHLGVBQWUsQ0FBQztBQUVwQyxNQUFNLFFBQVE7SUFHVixZQUNvQixpQkFBbUMsRUFDbkMsT0FBdUMsRUFDdkMsTUFBeUI7UUFGekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxZQUFPLEdBQVAsT0FBTyxDQUFnQztRQUN2QyxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUV6QyxpQ0FBaUM7UUFDakMsU0FBUztZQUNMLE1BQU0sRUFBRSxHQUFHLGFBQWEsRUFBRSxDQUFDO1lBQzNCLElBQUksYUFBYSxJQUFJLGVBQWU7Z0JBQUUsYUFBYSxHQUFHLGVBQWUsQ0FBQztZQUV0RSxrSEFBa0g7WUFDbEgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ25CLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDYixNQUFNO2FBQ1Q7U0FDSjtJQUNMLENBQUM7Q0FDSjtBQW1GRCxNQUFhLFVBQVU7SUFNbkIsWUFBWSxJQUFZLEVBQUUsU0FBMEIsRUFBRSxZQUFvQixFQUFFO1FBQ3hFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksU0FBUyxFQUFFO1lBQ1gsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDVCxJQUFJ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