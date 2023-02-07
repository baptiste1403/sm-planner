import { FormControl } from "@angular/forms";

export function requiredFileType(types: string[]) {
    types = types.map(type => type.toLowerCase());
    return function (control: FormControl) {
        const files = control.value;
        if(!files) {
            return null;
        }
        for(const file of files) {
            console.log(file);
            if (file) {
                const extension = file.name.split(".")[1];
                if (!types.includes(extension.toLowerCase())) {
                    return {
                        requiredFileType: true
                    };
                }
                return null;
            }
        }
        return null;
    };
}
