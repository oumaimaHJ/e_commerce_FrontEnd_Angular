import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CatalogueService } from '../catalogue.service';
import { Product } from '../model/product.model';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  currentProduct: any;
  selectedFiles:any;
  progress: number | undefined;
  currentFileUpload: any;
  currentTime: number | undefined;
  mode: number=0;
  editPhoto: boolean = false;


  constructor(private router:Router, private route:ActivatedRoute,
    public catService:CatalogueService, public authService:AuthenticationService ) { }

  ngOnInit(): void {
    let url=atob(this.route.snapshot.params['url']);
    this.catService.getProduct(url).subscribe(data=>{
      this.currentProduct=data;
    })
  }
  onEditPhoto(p: Product) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event:any) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * (event.loaded || 1) / (event.total || 1))
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }

  getTS() {
    return this.currentTime;
  }

  onProductDetails(p:any) {
    this.router.navigateByUrl("/product/"+p.id);
  }

  onEditProduct() {
    this.mode=1;
  }

  onUpdateProduct(data:any) {
    
  }

}
