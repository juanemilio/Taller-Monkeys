describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(10);
    })
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function randomEvent(monkeysLeft) {
    if(monkeysLeft > 0) {
        var evento = getRandomInt(1, 4);
        if(evento===1){
            //CLick en u link al azar
            cy.get('a').then($links => {
                var randomLink = $links.get(getRandomInt(0, $links.length));
                if(!Cypress.dom.isHidden(randomLink)) {
                    cy.wrap(randomLink).click({force: true});  
                    monkeysLeft = monkeysLeft - 1;                  
                }                  
                cy.wait(1000);    
                randomEvent(monkeysLeft);                       
            });   
            
                
        }else if(evento===2){
            //Llenar un campo de texto al azar
            cy.get('input').then($inputs => {
                var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
                if(!Cypress.dom.isHidden(randomInput)) {
                    cy.wrap(randomInput).click({force: true}).type("monkey's text", {force: true}); 
                    monkeysLeft = monkeysLeft - 1;
                }     
                cy.wait(1000);    
                randomEvent(monkeysLeft);           
            });
            
        }else if(evento===3){
            //Seleccionar un combo al azar
            cy.get('select').then($selects => {
                var randomSelect = $selects.get(getRandomInt(0, $selects.length));
                if(!Cypress.dom.isHidden(randomSelect)) {
                    cy.wrap(randomSelect).select();   
                    monkeysLeft = monkeysLeft - 1;                 
                }     
                cy.wait(1000);    
                randomEvent(monkeysLeft);          
             });
            
        }else{
            //Hacer click en un botón al azar
            cy.get('button').then($bottons => {
                var randomBotton = $bottons.get(getRandomInt(0, $bottons.length));
                if(!Cypress.dom.isHidden(randomBotton)) {
                    cy.wrap(randomBotton).click();   
                    monkeysLeft = monkeysLeft - 1;                    
                }       
                cy.wait(1000);    
                randomEvent(monkeysLeft);            
            });
        }       
    } 
}