public with sharing class SearchController {
    public SearchController() {

    }

   /*
    public static List<Product2> retriveProducts(String strProdName) {
        strProdName = '%' + strProdName + '%';
        List<Product2> lstProd = [SELECT  Id, Name, ProductCode FROM Product2 WHERE Name LIKE :strProdName];
        return lstProd; 
    }*/
    @AuraEnabled(Cacheable = true)
    public static List<OpportunityLineItem>  retriveallProducts(String oppId) {
        List<OpportunityLineItem> oliItem = [SELECT Id,Product2.Name, OpportunityId FROM OpportunityLineItem where OpportunityId=:oppId];
        system.debug('OliItem========== '+oliItem);
         return oliItem; 
    }

    @AuraEnabled(Cacheable = true)
    public static List<Product2> retriveProducts( String searchKey, String sortBy, String sortDirection ) {
       system.debug('!!!' + searchKey + ' ' + sortBy + ' ' + sortDirection);
       String query = 'SELECT  Id, Name, ProductCode FROM Product2';
       if ( searchKey != null && searchKey != '' ) {
           String key = '%' + searchKey + '%';
           query += ' WHERE Name LIKE :key';
       }
 
       if ( sortBy != null && sortDirection != null ) {
           query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
       }
       return Database.query( query );
   }
}
