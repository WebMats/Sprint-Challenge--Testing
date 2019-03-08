Q1. In Jest, what are the differences between describe() and it() globals, and what are good uses for them?
    ANS: The describe() global is used for partitioning sets of related tests, under one global scope.
        In constrast, the it() global should not be used to martition sets of tests; as it is an alies
        for the test() global.

Q2. What is the point of Test Driven Development? What do you think about this approach?
    ANS: Test driven development should be used to proactively anticipate logical errors 
        in blocks of code that will have convoluted logic. In this way we have predefined 
        the functionality and exceptations of its logic, and we can be warned of any errors
        as we code that functionality. I think that, when used properly, TDD can be immensely
        valuable. However, it is easy for someone who is overtly cautious and new to testing
        to want to predefine all tests for every dimension of an app, which becomes 
        counterproductive extremely quickly.


Q3. Mention three types of automated tests.
    ANS:
        1) Unit testing: Testing one component, in isolation, of an application.
        2) Integrated testing: Testing an ensemble of components, which are 
            dedicated to perform a specific action, at a given time.
        3) Smoke testing: Testing units/ensembles that are most critical to the
            functionality of our app.