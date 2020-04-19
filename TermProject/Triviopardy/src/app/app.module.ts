import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamAvatarsComponent } from './components/game-component/team-avatars/team-avatars.component';
import { CountdownClockComponent } from './components/game-component/countdown-clock/countdown-clock.component';
import { QuestionBlockComponent } from './components/game-component/question-block/question-block.component';
import { PotentialAnswersComponent } from './components/game-component/potential-answers/potential-answers.component';
import { AnswerBlockComponent } from './components/game-component/potential-answers/answer-block/answer-block.component';
import { GuessBlockComponent } from './components/game-component/guess-block/guess-block.component';
import { QuestionFormatterPipe } from './components/game-component/potential-answers/question-formatter.pipe';
import { GameComponentComponent } from './components/game-component/game-component.component';
import { ResultsComponentComponent } from './components/results-component/results-component.component';
import { StartComponentComponent } from './components/start-component/start-component.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamAvatarsComponent,
    CountdownClockComponent,
    QuestionBlockComponent,
    PotentialAnswersComponent,
    AnswerBlockComponent,
    GuessBlockComponent,
    QuestionFormatterPipe,
    GameComponentComponent,
    ResultsComponentComponent,
    StartComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
