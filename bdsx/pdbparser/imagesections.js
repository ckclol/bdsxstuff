"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSections = exports.ImageSections = exports.ImageSectionHeader = void 0;
const dll_1 = require("../dll");
const nativetype_1 = require("../nativetype");
const util_1 = require("../util");
const windows_h_1 = require("../windows_h");
const DOS_MAGIC = util_1.makeSignature('MZ');
const NT_MAGIC = util_1.makeSignature('PE');
class ImageSectionHeader {
    constructor(name, rva, size) {
        this.name = name;
        this.rva = rva;
        this.size = size;
    }
}
exports.ImageSectionHeader = ImageSectionHeader;
class ImageSections {
    constructor() {
        this.sections = [];
        this.module = dll_1.dll.current;
        const header = this.module.as(windows_h_1.IMAGE_DOS_HEADER);
        if (header.e_magic !== DOS_MAGIC)
            throw Error('Invalid DOS signature');
        const ntheader = header.addAs(windows_h_1.IMAGE_NT_HEADERS64, header.e_lfanew);
        if (ntheader.Signature !== NT_MAGIC)
            throw Error('Invalid NT signature');
        const count = ntheader.FileHeader.NumberOfSections;
        const sectionHeaderSize = windows_h_1.IMAGE_SECTION_HEADER[nativetype_1.NativeType.size];
        let ptr = windows_h_1.IMAGE_FIRST_SECTION(ntheader);
        for (let i = 0; i < count; i++) {
            const array = ptr.Name.toArray();
            const len = array.indexOf(0);
            if (len !== -1)
                array.length = len;
            const name = String.fromCharCode(...array);
            this.sections.push(new ImageSectionHeader(name, ptr.VirtualAddress, ptr.SizeOfRawData));
            ptr = ptr.addAs(windows_h_1.IMAGE_SECTION_HEADER, sectionHeaderSize);
        }
    }
    getSectionOfRva(rva) {
        for (const section of this.sections) {
            if (rva >= section.rva)
                continue;
            if ((rva - section.rva) >= section.size)
                return null;
            return section;
        }
        return null;
    }
}
exports.ImageSections = ImageSections;
exports.imageSections = new ImageSections;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VzZWN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImltYWdlc2VjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0NBQTZCO0FBQzdCLDhDQUEyQztBQUMzQyxrQ0FBd0M7QUFDeEMsNENBQStHO0FBRy9HLE1BQU0sU0FBUyxHQUFHLG9CQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsTUFBTSxRQUFRLEdBQUcsb0JBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVyQyxNQUFhLGtCQUFrQjtJQUMzQixZQUNvQixJQUFXLEVBQ1gsR0FBVSxFQUNWLElBQVc7UUFGWCxTQUFJLEdBQUosSUFBSSxDQUFPO1FBQ1gsUUFBRyxHQUFILEdBQUcsQ0FBTztRQUNWLFNBQUksR0FBSixJQUFJLENBQU87SUFDL0IsQ0FBQztDQUNKO0FBTkQsZ0RBTUM7QUFFRCxNQUFhLGFBQWE7SUFJdEI7UUFIaUIsYUFBUSxHQUF3QixFQUFFLENBQUM7UUFDcEMsV0FBTSxHQUFHLFNBQUcsQ0FBQyxPQUFPLENBQUM7UUFHakMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsNEJBQWdCLENBQUMsQ0FBQztRQUNoRCxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssU0FBUztZQUFFLE1BQU0sS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDdkUsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyw4QkFBa0IsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkUsSUFBSSxRQUFRLENBQUMsU0FBUyxLQUFLLFFBQVE7WUFBRSxNQUFNLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7UUFDbkQsTUFBTSxpQkFBaUIsR0FBRyxnQ0FBb0IsQ0FBQyx1QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hFLElBQUksR0FBRyxHQUFHLCtCQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUNuQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN4RixHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQ0FBb0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1NBQzVEO0lBQ0wsQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUFVO1FBQ3RCLEtBQUssTUFBTSxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRztnQkFBRSxTQUFTO1lBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ25ELE9BQU8sT0FBTyxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBOUJELHNDQThCQztBQUVZLFFBQUEsYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDIn0=