var productHandler={
addProduct: function(){
    databaseHandler.db.transaction(
        function(tx){
                tx.executeSql('DROP TABLE IF EXISTS product');
                tx.executeSql('CREATE TABLE IF NOT EXISTS product (_id integer primary key , name, quantity)');
                tx.executeSql('INSERT INTO product (name, quantity) VALUES (1, "First row")');
                tx.executeSql('INSERT INTO product (name, quantity) VALUES (2, "Second row")');
                tx.executeSql('INSERT INTO product (name, quantity) VALUES (3, "Third row")');
        },
        function(error){},
        function(){}
    );
},
loadProducts: function(displayProducts){
    databaseHandler.db.readTransaction(
        function(tx){
            tx.executeSql(
                "select * from product",
                [],
                function(tx, results){
                    //Do the display
                    displayProducts(results);
                },
                function(tx, error){//TODO: Alert the message to user
                    console.log("Error while selecting the products" + error.message);
                }
            );
        }
    );
},
deleteProduct:function(_id){
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "delete from product where _id = ?",
                [_id],
                function(tx, results){},
                function(tx, error){//TODO: Could make an alert for this one.
                    console.log("Error happen when deleting: " + error.message);
                }
            );
        }
    );
},
updateProduct: function(_id, newName, newQuantity){
    databaseHandler.db.transaction(
        function(tx){
            tx.executeSql(
                "update product set name=?, quantity=? where _id = ?",
                [newName, newQuantity, _id],
                function(tx, result){},
                function(tx, error){//TODO: alert/display this message to user
                    console.log("Error updating product" + error.message);
                }
            );
        }
    );
}
};