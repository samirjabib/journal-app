import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

export const JournalApp = () => { //Envolvemos nuestra app en nuestro HOC cone l theme. 
  return (
    <AppTheme>
        <AppRouter />
    </AppTheme>
  )
}
