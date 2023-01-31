import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class Utils {
  static compareFn(compared1: { id: number }, compared2: { id: number }) {
    return compared1 && compared2 ? compared1.id === compared2.id : compared1 === compared2;
  }

  static formatStringDate(source: string, sourceFormat: string, targetFormat: string) {
    if (source && sourceFormat && targetFormat) {
      const date = moment(source, sourceFormat);

      if (date.isValid()) {
        return date.format(targetFormat);
      }
    }

    return '';
  }

  static dateToString(date: Date) {
    if (date) {
      return moment(date).format('DD/MM/YYYY HH:mm:ss');
    }
    return '-';
  }

  static dateToStringFormat(date: Date, format: string) {
    if (date) {
      return moment(date).format(format);
    }
    return '-';
  }

  static hexToRGB(hex: string, opacity: string) {
    let r = '0', g = '0', b = '0';

    if (!hex) return '#FFF';

    if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }

    return opacity ? "rgba(" + +r + "," + +g + "," + +b + ", " + opacity + ")" : "rgb(" + +r + "," + +g + "," + +b + ")";
  }

  static removeAccents(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  static removeMask(text: string) {
    return text && text.replace(/\D+/g, '');
  }

  static titlecase(value: string) {
    let first = value.substring(0,1).toUpperCase();
    return first + value.substring(1).toLowerCase();
  }
}
