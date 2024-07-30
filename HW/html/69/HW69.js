"use strict"
(function()
{
    bankAccount1 = 
    {
        balance: 0,
        performTransaction: function(amount, type)
        {   
            if(type === "deposit")
            {
            this.balance += amount;
            }
            else if (type === "withdrawal")
            this.balance -= amount;
    
        }
    
    
    }
    
    
    bankAccount2 = 
    {
        balance: 0,
        performTransaction: function(amount, type)
        {   
            if(type === "deposit")
            {
            this.balance += amount;
            }                       
            else if (type === "withdrawal")
            this.balance -= amount;
        
        }
    }
    
    
    function outerTransaction(amount, type) 
    {
        if(type === "deposit")
            {
                this.balance += amount;
            }                       
        else if (type === "withdrawal")
           {
                this.balance -= amount;
           } 

    };

    outerTransaction.call(bankAccount1, 10, "deposit");
    
    depositFiftyInSavings = outerTransaction.bind(bankAccount1, 50, "deposit");
    depositFiftyInSavings();

}());