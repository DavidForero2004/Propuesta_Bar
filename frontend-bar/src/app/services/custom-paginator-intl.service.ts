import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomPaginatorIntlService extends MatPaginatorIntl {
  override itemsPerPageLabel: string = 'Elemento por página';
  override nextPageLabel: string = 'Página siguiente';
  override previousPageLabel: string = 'Página anterior';
  override firstPageLabel: string = 'Primera página';
  override lastPageLabel: string = 'Última página';

  constructor (private translate: TranslateService) {
    super();
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    // this.translate.get('paginteUser').subscribe((res: string) => {
    //   this.itemsPerPageLabel = res;
    // });
  }
}
