import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { Logger, LoggingConfigurer } from '@zowe/imperative';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  loggerApi: typeof Logger;
  loggingConfigurerApi: typeof LoggingConfigurer;

  constructor(private electron: ElectronService) {

    if (this.electron.isElectron) {
      this.loggerApi = window.require('@zowe/imperative').Logger;
      this.loggingConfigurerApi = window.require('@zowe/imperative').LoggingConfigurer;

      // init dummy logger for imperative
      this.loggerApi.initLogger(this.loggingConfigurerApi.configureLogger('.zowe-electron', { name: 'zowe-electron' }));
    }

  }
}
