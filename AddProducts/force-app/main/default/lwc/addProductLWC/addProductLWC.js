/* eslint-disable no-console */
import { LightningElement, track,wire,api } from 'lwc';
import serachProds from '@salesforce/apex/SearchController.retriveProducts';
import showallprod from '@salesforce/apex/SearchController.retriveallProducts';
//mport showallprodlist from '@salesforce/apex/SearchController.retriveallProducts';
import { refreshApex } from '@salesforce/apex';

export default class addProductLWC extends LightningElement {
    @track openmodel = false;
    @track areDetailsVisible = false;
    @track searchData;//@track data;
    @track error;
    @api sortedDirection = 'asc';
    @api sortedBy = 'Name';
    @api searchKey = '';
    @api recordId;
   result;showdprod;
    
    
    @track columns = [
        {
            label: 'Name',
            fieldName: 'Name',
            type: 'url',
            sortable: true,
            typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}
        }, {
            label: 'Product Code',
            fieldName: 'ProductCode',
            type: 'text',
            sortable: true
        }, 
        ];

    @track strSearchProdName ;
     
    @wire(showallprod, {oppId:'$recordId' })
    getprod(showdprod) {
        this.showdprod = showdprod;
        if (showdprod.data) {
            this.areDetailsVisible = true;
            this.searchData = showdprod.data;
           
            console.log('datashow================', this.searchData );
        } else if (showdprod.error) {
            this.error = showdprod.error;
        }
    }
    @wire(serachProds, {searchKey: '$searchKey', sortBy: '$sortedBy', sortDirection: '$sortedDirection' })
    getProductssearch(result) {
        this.result = result;
        if (result.data) {
            this.searchData = result.data;
            console.log('datashow================', this.searchData );
        } else if (result.error) {
            this.error = result.error;
        }
    }
    sortColumns( event ) {
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;
        return refreshApex(this.result);
       
    }
    handleProductName( event ) {
        this.searchKey = event.target.value;
        return refreshApex(this.result);
    }

    openmodal() {
        this.openmodel = true;
        // eslint-disable-next-line no-console
        console.log('openmodel===',this.openmodel)
       // this.template.querySelector('.gr__manishnagar-dev-ed_lightning_force_com').style.overflow = "hidden"; 
        // eslint-disable-next-line no-console
       // console.log('desktopclass',this.template.querySelector('.desktop'))
       // document.body.setAttribute('style', 'overflow: visible;');
    }
    closeModal() {
        this.openmodel = false
    } 
    saveMethod() {
        // eslint-disable-next-line no-alert
        alert('save method invoked');
        this.closeModal();
    }
  
  
}