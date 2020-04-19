import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';

@Pipe({
  name: 'tokenizer'
})
export class TokenizerPipe implements PipeTransform {

  transform(value: String, ...args: any[]): String {
    // declare the type for token
    token: String;
    // extract the first argument from ...args; which represents the token
    let token =  args[0];
    // return the phrase, delimited by the token
    return value.split("").join(token)
  }

}
