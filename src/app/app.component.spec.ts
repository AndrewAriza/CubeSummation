import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [
        FormsModule,
        MaterialModule,
        NoopAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it(`Test 1`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    app.input = '2\n4 5\nUPDATE 2 2 2 4\nQUERY 1 1 1 3 3 3\nUPDATE 1 1 1 23\nQUERY 2 2 2 4 4 4\nQUERY 1 1 1 3 3 3\n2 4\nUPDATE 2 2 2 1\nQUERY 1 1 1 1 1 1\nQUERY 1 1 1 2 2 2\nQUERY 2 2 2 2 2 2';

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.detectChanges();

    expect(app.output).toBe('4\n4\n27\n0\n1\n1\n');
  }));
});
