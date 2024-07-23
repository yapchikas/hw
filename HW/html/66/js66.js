"use strict";

const LowercaseLetters = ["a","b","c","d","e"];
const UppercaseLetters = ["A","B","C","D","E"];
const MixedCaseLetters = ["A","b","C","D","e"];


function CustomTester(array, test) 
{
    const result = test(array);
    return result;
}

function TestForAllUppercase(array)
{
    
    for (let i = 0; i<array.length; i++)
    {
        if (array[i] !== array[i].toUpperCase())
            {
                return false;
            }
        
    }
    return true;
}

function TestAnyForUppercase(array)
{
    
    for (let i = 0; i<array.length; i++)
    {
        if (array[i] === array[i].toUpperCase())
            {
                return true;
            }
        
    }
    return false;
}

function OnlyIf(array, tester, action)
{
    for (let i = 0; i<array.length; i++)
    {
        if (tester(array[i]))
        {
            action(array[i]);
        }
    }
}

function MyAction(letter)
{
    console.log(`\"OnlyIf\" test passed for ${letter}!`)
}

/////////////////////////////////////////////////////////////////

console.log(CustomTester(LowercaseLetters, TestForAllUppercase));
console.log(CustomTester(UppercaseLetters, TestForAllUppercase));
console.log(CustomTester(MixedCaseLetters, TestForAllUppercase));

console.log(CustomTester(LowercaseLetters, TestAnyForUppercase));
console.log(CustomTester(UppercaseLetters, TestAnyForUppercase));
console.log(CustomTester(MixedCaseLetters, TestAnyForUppercase));

OnlyIf(LowercaseLetters, TestForAllUppercase, MyAction);
OnlyIf(UppercaseLetters, TestForAllUppercase, MyAction);
OnlyIf(MixedCaseLetters, TestForAllUppercase, MyAction);

