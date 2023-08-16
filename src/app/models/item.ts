export class Item {
    date: Date;
    alcohole: string = "";
    dayTime: string  = "";
    pillsWorkFast: string = "";
    temperature: string  = "";
    howManyPills: string = "";
    cycleDay: string = "";
    nightTraweling: string = "";
    noBrackfast: string = "";
    stress: string = "";
    flu: string = "";

    constructor(date: Date) {
        this.date = date;
    }

    tags(): string[] {
        const parts = []
        if (this.alcohole) {
            parts.push("Alcohol");
        }
        if (this.pillsWorkFast) {
            parts.push("Pills work fast");
        }
        if (this.nightTraweling) {
            parts.push("Night traweling");
        }
        if (this.noBrackfast) {
            parts.push("No brackfast");
        }
        if (this.stress) {
            parts.push("Stress");
        }
        if (this.flu) {
            parts.push("Flu");
        }
        if (this.dayTime) {
            parts.push("Day time: " + this.dayTime);
        }
        if (this.temperature) {
            parts.push("Temp: " + this.temperature);
        }
        if (this.howManyPills) {
            parts.push("Pills: "+this.howManyPills);
        }
        if (this.cycleDay) {
            parts.push("Cycle day: " +this.cycleDay);
        }

        return parts;
    }

    static empty(): Item {
        return new Item(new Date());
    }

    static fromObject(obj: any): Item {
        const item = new Item(new Date(obj.date));
        item.alcohole = obj.alcohole;
        item.dayTime = obj.dayTime;
        item.pillsWorkFast = obj.pillsWorkFast;
        item.temperature = obj.temperature;
        item.howManyPills = obj.howManyPills;
        item.cycleDay = obj.cycleDay;
        item.nightTraweling = obj.nightTraweling;
        item.noBrackfast = obj.noBrackfast;
        item.stress = obj.stress;
        item.flu = obj.flu;
        return item;
    }
}