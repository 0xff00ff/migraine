export class Item {
    date: Date;
    alcohole: string = "";
    dayTime: string  = "";
    pillsWorkFast: string = "";
    weather: string  = "";
    howManyPills: string = "";
    cycleDay: string = "";
    nightTraweling: string = "";
    noBreackfast: string = "";
    stress: string = "";
    flu: string = "";
    additionalPill: string = "";
    backHeadPain: string = "";
    neckPain: string = "";

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
        if (this.noBreackfast) {
            parts.push("No breackfast");
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
        if (this.weather) {
            parts.push("Weather: " + this.weather);
        }
        if (this.howManyPills) {
            parts.push("Pills: "+this.howManyPills);
        }
        if (this.cycleDay) {
            parts.push("Cycle day: " +this.cycleDay);
        }
        if (this.additionalPill) {
            parts.push("Additional pills: " +this.additionalPill);
        }
        if (this.backHeadPain) {
            parts.push("Back head pain");
        }
        if (this.neckPain) {
            parts.push("Neck pain");
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
        item.weather = obj.weather;
        item.howManyPills = obj.howManyPills;
        item.cycleDay = obj.cycleDay;
        item.nightTraweling = obj.nightTraweling;
        item.noBreackfast = obj.noBreackfast;
        item.stress = obj.stress;
        item.flu = obj.flu;
        item.additionalPill = obj.additionalPill;
        item.backHeadPain = obj.backHeadPain;
        item.neckPain = obj.neckPain;

        return item;
    }
}