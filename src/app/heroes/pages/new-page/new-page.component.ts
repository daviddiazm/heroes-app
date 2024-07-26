import { Component, OnInit, Pipe } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroService } from '../../services/heroes.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfimDialogComponent } from '../../components/confim-dialog/confim-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  public hero?: Hero

  public publishers = [
    {
      id: 'DC comics',
      desc: 'DC-comics'
    },
    {
      id: 'Marvel comics',
      desc: 'Marvel-comics'
    },
  ]

  private id?: string

  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog : MatDialog
  ) { }

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) return;


    this.activatedRoute.params
      .subscribe(({ id }) => {
        this.heroService.getHeroById(id)
          .subscribe(hero => {
            if (!hero) this.router.navigateByUrl('/');
            this.heroForm.reset(hero)
          })
      })
  }

  public get currentHero(): Hero {
    const hero = this.heroForm.value as Hero
    return hero
  }


  onSubmit() {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroService.updateById(this.currentHero)
        .subscribe(hero => {
        this.showSnackBar('Se actualizo exitosamente')
        })
      return
    }

    this.heroService.addHero(this.currentHero)
      .subscribe(hero => {
        this.router.navigate(['/heroes/edit/', hero.id])
        this.showSnackBar('Se agrego exitosamente')
      })

    console.log({
      formIsVAlid: this.heroForm.valid,
      formValue: this.heroForm.value,
      formValueRaw: this.heroForm.getRawValue(),
    });
    return
  }

  onDelete (enterAnimationDuration: string, exitAnimationDuration: string) : void {

    const dialogRef = this.dialog.open(ConfimDialogComponent, {
        data:this.heroForm,
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      })

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result){
    //     this.heroService.deleteById(this.currentHero.id).subscribe(hero => {
    //       this.showSnackBar('se elimino correctamente')
    //     })
    //     this.router.navigate(['/heroes/list'])
    //   }
    // })

    dialogRef.afterClosed()
      .pipe(
        filter((resul:boolean) => resul), //solo deja pasar a valores verdaderos
        switchMap(() => this.heroService.deleteById(this.currentHero.id))
      )
      .subscribe(result => {
        this.showSnackBar('se elimino correctamente')
        this.router.navigate(['/heroes/list'])
      })

  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'done',{
      duration: 3000
    })
  }

}
