const Joi     = require('joi');         // for input validation
const express = require('express');     // first we need to load the express module which returns the function 
const app     = express();              //  we call the express function 
app.use(express.json());                // Way to use in body

// array of courses
const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'},
];
// Id environment port is there take that othewise default
const port = process.env.PORT || 3000;

// route parameter - getting single set of record based on the id eg, /api/courses/1
// 1st parameter = port, 2nd parameter (optional) = displaying message

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Handeling PUT requests
app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    // If not existing, return 404
    if(!course) return res.status(404).send('The course with the given ID was not found');
    
    // Validate
   // this function can be reused if we write in a function
   
   // using object destructred method to target property instead of result.error, i.e. accessing error property
   const { error } = courseValidate(req.body);      // equivalent to result.error
   if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }
   
   /* const result = courseValidate(req.body);
    // If invalid, return 400 - Bad request
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    } */

    // Update course
    course.name = req.body.name;
    
    // Return the updated course
    res.send(course);
});

// Handeling Delete request 
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));

    // Not existing, return 404
    if(!course) return res.status(404).send('The course with the given ID was not found');

    // Delete - in order to delete we will take out index of that course that needs to be deleted
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    // Return the same course
    res.send(course);
});
// function handeling the validation
function courseValidate(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}


app.listen(port, () => console.log(`Listening in port ${port} ...`));