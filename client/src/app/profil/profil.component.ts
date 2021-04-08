import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  public userInfo = [];

  /**
   * Nome
   */
  public name = '';

  /**
   * RG
   */
  public geral_register = '';

  /**
   * Endereço
   */
  public address = '';

  /**
   * Complemento
   */
  public complement = '';

  /**
   * CEP
   */
  public ZIP = '';

  /**
   * Bairro
   */
  public neighborhood = '';

  /**
   * Cidade
   */
  public city = '';

  /**
   * UF
   */
  public federal_unit = '';

  /**
   * Telefone
   */
  public phone = '';

  /**
   * Celular
   */
  public celphone = '';

  /**
   * Settings Constructor
   *
   * @param { UsersService } users - Users HTTP Service
   * @param { Router } router - Angular Router
   */
  constructor(
    private router: Router,
  ) { }


 

  ngOnInit(): void {
  }

}
