import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash';

@Pipe({
  name: 'questionFormatter'
})
export class QuestionFormatterPipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): unknown {
    return value.replace(/&quot;/g, '\"').replace(/&#039;/g, "\'").replace(/&amp;/g, "\&")
  }

}
