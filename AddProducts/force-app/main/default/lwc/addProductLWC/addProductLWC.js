import { LightningElement, track  } from 'lwc';
import serachProds from '@salesforce/apex/SearchController.retriveProducts';
import showallprodlist from '@salesforce/apex/SearchController.retriveallProducts';

const columns = [
    {
        label: 'Name',
        fieldName: 'Name',
        type: 'url',
        typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}
    }, {
        label: 'Product Code',
        fieldName: 'ProductCode',
        type: 'text',
    }, 
    ];

export default class addProductLWC extends LightningElement {
    @track openmodel = false;
    @track searchData;
    @track columns = columns;
    @track strSearchProdName;
     
    connectedCallback() {
        this.searchData = showallprodlist;
    }



    openmodal() {
        this.openmodel = true
    }
    closeModal() {
        this.openmodel = false
    } 
    saveMethod() {
        // eslint-disable-next-line no-alert
        alert('save method invoked');
        this.closeModal();
    }

    handleProductName(event) {
        this.strSearchProdName = event.detail.value;
        serachProds({strProdName : this.strSearchProdName})
        .then(result => {
        this.searchData = result;
    })
}
}