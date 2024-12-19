// include this statement before executing any individual script
const trs= document.querySelectorAll('tr')

// for horizontal 
// variables: index (to select the row), i(to select the row elements) ; (first element of a row is indexed at 0, and first row os indexed at 1)

trs.forEach((tr, index) => {
    if (index === 1) { 
        const tds = tr.querySelectorAll('td[tabindex]'); 
        for (let i = 1; i <= 6; i++) {
            if (tds[i]) { 
                tds[i].setAttribute('data-level', '4'); 
            }
        }
    }
});
// for vertical
// variables: i (to select ith row); tds[c] (to select cth row element) 

for (let i = 1; i <=7 ; i++) {
    const tds = trs[i].querySelectorAll('td[tabindex]'); 
    tds[8].setAttribute('data-level', '4')
}

// for diagonally up;  i selects the rows; index selects the row elements
let index = 7
for (let i = 1; i <=4 ; i++) {
    const tds = trs[i].querySelectorAll('td[tabindex]'); 
    tds[index++].setAttribute('data-level', '4')
}