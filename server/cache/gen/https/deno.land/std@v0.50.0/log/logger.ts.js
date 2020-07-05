// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { LogLevels, getLevelByName, getLevelName, } from "./levels.ts";
export class LogRecord {
    constructor(msg, args, level) {
        this.msg = msg;
        this.#args = [...args];
        this.level = level;
        this.#datetime = new Date();
        this.levelName = getLevelName(level);
    }
    #args;
    #datetime;
    get args() {
        return [...this.#args];
    }
    get datetime() {
        return new Date(this.#datetime.getTime());
    }
}
export class Logger {
    constructor(levelName, handlers) {
        this.level = getLevelByName(levelName);
        this.levelName = levelName;
        this.handlers = handlers || [];
    }
    _log(level, msg, ...args) {
        if (this.level > level)
            return;
        const record = new LogRecord(msg, args, level);
        this.handlers.forEach((handler) => {
            handler.handle(record);
        });
    }
    debug(msg, ...args) {
        this._log(LogLevels.DEBUG, msg, ...args);
    }
    info(msg, ...args) {
        this._log(LogLevels.INFO, msg, ...args);
    }
    warning(msg, ...args) {
        this._log(LogLevels.WARNING, msg, ...args);
    }
    error(msg, ...args) {
        this._log(LogLevels.ERROR, msg, ...args);
    }
    critical(msg, ...args) {
        this._log(LogLevels.CRITICAL, msg, ...args);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBFQUEwRTtBQUMxRSxPQUFPLEVBQ0wsU0FBUyxFQUNULGNBQWMsRUFDZCxZQUFZLEdBRWIsTUFBTSxhQUFhLENBQUM7QUFHckIsTUFBTSxPQUFPLFNBQVM7SUFPcEIsWUFBWSxHQUFXLEVBQUUsSUFBZSxFQUFFLEtBQWE7UUFDckQsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQVhELEtBQUssQ0FBWTtJQUNqQixTQUFTLENBQU87SUFXaEIsSUFBSSxJQUFJO1FBQ04sT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sTUFBTTtJQU1qQixZQUFZLFNBQW9CLEVBQUUsUUFBd0I7UUFDeEQsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLElBQUksRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBYSxFQUFFLEdBQVcsRUFBRSxHQUFHLElBQWU7UUFDakQsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUs7WUFBRSxPQUFPO1FBRS9CLE1BQU0sTUFBTSxHQUFjLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQVEsRUFBRTtZQUN0QyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFXLEVBQUUsR0FBRyxJQUFlO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQVcsRUFBRSxHQUFHLElBQWU7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxPQUFPLENBQUMsR0FBVyxFQUFFLEdBQUcsSUFBZTtRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFXLEVBQUUsR0FBRyxJQUFlO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVcsRUFBRSxHQUFHLElBQWU7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FDRiJ9