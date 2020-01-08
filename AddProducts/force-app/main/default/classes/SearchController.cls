public with sharing class SearchController {
    public SearchController() {

    }

    @AuraEnabled(Cacheable = true)
    public static List<Product2> retriveProducts(String strProdName) {
        strProdName = '%' + strProdName + '%';
        List<Product2> lstProd = [SELECT  Id, Name, ProductCode FROM Product2 WHERE Name LIKE :strProdName];
        return lstProd; 
    }
    @AuraEnabled(Cacheable = true)
    public static List<Product2>  retriveallProducts() {
        List<Product2> lstallProd = [SELECT  Id, Name, ProductCode FROM Product2];
        return lstallProd; 
    }
}
