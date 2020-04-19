import { QuestionFormatterPipe } from './question-formatter.pipe';

describe('QuestionFormatterPipe', () => {
  it('create an instance', () => {
    const pipe = new QuestionFormatterPipe();
    expect(pipe).toBeTruthy();
  });
});
