import { CanDeactivateFn } from '@angular/router';

export const authDeGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
