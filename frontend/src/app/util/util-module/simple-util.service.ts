import { Inject, Injectable } from '@angular/core';
import { LOCATION } from '@ng-web-apis/common';
import { Logger } from '../../services/logger/logger.service';

@Injectable({
  providedIn: 'any',
})
export class SimpleUtilService {
  private readonly logger = new Logger(SimpleUtilService.name);

  constructor(@Inject(LOCATION) private readonly location: Location) {}

  public getHost(): string {
    return this.location.protocol + '//' + this.location.host;
  }

  public downloadBuffer(
    buffer: ArrayBuffer | string,
    filename: string,
    filetype: string = 'application/octet-stream',
  ) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(
      new Blob([buffer], { type: filetype }),
    );
    a.download = filename;
    a.target = '_self';
    a.click();
  }
}
