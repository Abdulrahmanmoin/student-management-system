import inquirer from "inquirer";
class Students {
    name;
    id;
    coursedEnrolled;
    feesAmount;
    constructor(name, id, coursedEnrolled, feesAmount) {
        this.name = name;
        this.id = id;
        this.coursedEnrolled = coursedEnrolled;
        this.feesAmount = feesAmount;
    }
}
let students = [];
let studentId = 10000;
let condition = true;
do {
    let action = await inquirer.prompt({
        type: "list",
        name: "ans",
        message: "Please select an option",
        choices: ["Enroll a student", "Show student status"]
    });
    if (action.ans == "Enroll a student") {
        let enterName = await inquirer.prompt({
            type: "input",
            name: "ans",
            message: "Please enter your name:"
        });
        let trimmedFinalName = (enterName.ans).trim().toLowerCase();
        let studentNameCheck = students.some(student => student.name == trimmedFinalName);
        if (!studentNameCheck) {
            if (trimmedFinalName != "") {
                console.log("\n\tYour account has been created.");
                console.log(`\n\tWelcome ${trimmedFinalName}`);
                let courses = await inquirer.prompt({
                    type: "list",
                    name: "ans",
                    message: "Please select a course",
                    choices: ["TypeScript", "Python", "AI"]
                });
                let continueEnroll = await inquirer.prompt({
                    type: "confirm",
                    name: "ans",
                    message: "Do you want to enroll in this course?"
                });
                if (continueEnroll.ans == true) {
                    let courseFee = 0;
                    switch (courses.ans) {
                        case "TypeScript":
                            courseFee = 5000;
                            break;
                        case "Python":
                            courseFee = 4000;
                            break;
                        case "AI":
                            courseFee = 9000;
                            break;
                        default:
                            break;
                    }
                    console.log(`You have enrolled in this course and please pay the ${courseFee} rupess as a fee.`);
                    let newStudent = new Students(trimmedFinalName, studentId, [courses.ans], courseFee);
                    students.push(newStudent);
                    studentId++;
                }
            }
            else {
                console.log("Invalid name");
            }
        }
        else {
            console.log("This name is already exists");
        }
    }
    else {
        if (students.length == 0) {
            console.log("Record is empty");
        }
        else {
            let listOfName = students.map(student => student.name);
            let showData = await inquirer.prompt({
                type: "list",
                name: "ans",
                message: "Please select any name.",
                choices: listOfName
            });
            for (const name of listOfName) {
                if (showData.ans == name) {
                    for (const student of students) {
                        if (student.name == showData.ans) {
                            console.log(student);
                        }
                    }
                }
            }
        }
    }
    let continueProcess = await inquirer.prompt({
        type: "confirm",
        name: "ans",
        message: "Do you want to continue?"
    });
    if (continueProcess.ans == false) {
        condition = false;
    }
} while (condition);
