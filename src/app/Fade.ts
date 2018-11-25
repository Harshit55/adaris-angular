import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
    trigger('fadeInAnimation', [
        // route 'enter' transition
        transition(':enter', [

            // styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('.3s ease-in', style({ opacity: 1 }))
        ]),
            // route 'enter' transition
            transition(':leave', [

            // styles at start of transition
            style({ opacity: 1 }),

            // animation and styles at end of transition
            animate('.3s ease-in', style({ opacity: 0 }))
        ]),
            
    ]);