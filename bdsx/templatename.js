"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateName = void 0;
function templateName(name, ...templateParams) {
    let idx = templateParams.length;
    if (idx === 0)
        return name + '<>';
    idx--;
    if (templateParams[idx].endsWith('>'))
        templateParams[idx] += ' ';
    return name + '<' + templateParams.join(',') + '>';
}
exports.templateName = templateName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVuYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVtcGxhdGVuYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLFNBQWdCLFlBQVksQ0FBQyxJQUFXLEVBQUUsR0FBRyxjQUF1QjtJQUNoRSxJQUFJLEdBQUcsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBQ2hDLElBQUksR0FBRyxLQUFLLENBQUM7UUFBRSxPQUFPLElBQUksR0FBQyxJQUFJLENBQUM7SUFDaEMsR0FBRyxFQUFFLENBQUM7SUFDTixJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQztJQUNsRSxPQUFPLElBQUksR0FBQyxHQUFHLEdBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQyxHQUFHLENBQUM7QUFDakQsQ0FBQztBQU5ELG9DQU1DIn0=