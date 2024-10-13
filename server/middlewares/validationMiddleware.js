import { body, param, validationResult } from "express-validator";
import Class from "../models/classModel.js";


const withErrorMessages = (what_to_validate) => {
    return [what_to_validate, (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            const errorMessage = errors.array().map((error) => error.msg)

            return res.status(400).json({
                error: errorMessage
            })
        }

        next()
    }]
}

export const validate_student_details = withErrorMessages([
    body("firstName")
        .notEmpty()
        .withMessage("First name is required!")
        .trim()
        .escape(),
    body("lastName")
        .notEmpty()
        .withMessage("Last name is required!")
        .trim()
        .escape(),
    body("otherNames")
        .optional()
        .trim()
        .escape(),
    body('class_id')
        .optional()
        .isMongoId().withMessage('Invalid class ID format!'),
  body('subjects')
  .optional()
  .isArray({ min: 1 }).withMessage('Subjects should be an array with at least one subject!')
  .custom((value) => value.every((id) => typeof id === 'string'))
  .withMessage('One or more subject IDs are not valid strings!'),

      
  
])

export const validate_staff_details = withErrorMessages([
    body("firstName")
        .notEmpty()
        .withMessage("First name is required!")
        .trim()
        .escape(),
    body("lastName")
        .notEmpty()
        .withMessage("Last name is required!")
        .trim()
        .escape(),
    body("phoneNo")
        .notEmpty()
        .withMessage("Phone number is required!")
        .matches(/^(\+234|0)[789]\d{9}$/)
        .withMessage("Invalid phone number")
        .trim()
        .escape(),
    body("email")
        .notEmpty()
        .withMessage("Email is required!")
        .isEmail()
        .withMessage("Invalid email format!")
        .normalizeEmail(),
    body("password")
        .notEmpty()
        .withMessage("Password is required!")
        .isLength({min: 8})
        .withMessage("Password must be at least 8 characters long!")
        .trim(),
    body("confirmPass")
        .notEmpty()
        .withMessage("Please confirm your password!")
        .isLength({min: 8})
        .withMessage("Confirm password must be at least 8 characters long!")
        .trim()
        .custom((value, {req}) => {
            if (value !== req.body.password){
                throw new Error("Password and confirm password do not match!")
            }
            return true
        }),
    body("assigned_class")
        .optional()
        .isMongoId().withMessage("Invalid assigned class ID format!"),
    body("assigned_subjects")
        .optional()
        .isArray().withMessage('Students should be an array!')
        .custom((value) => {
        // Check if each item in the array is a valid MongoDB ObjectId
            return value.every(id => mongoose.isValidObjectId(id));
    }).withMessage('Invalid subject ID format!'),
    // body("status")
    //     .isIn(["active", "in-active"])
    //     .withMessage("Invalid status!"),
])

export const validate_subject_details = withErrorMessages([
    body("name")
        .notEmpty()
        .withMessage("Subject name is required!")
        .trim()
        .escape(),
    body('subject_teacher')
        .optional()
        .isMongoId().withMessage('Invalid subject teacher ID format!'),
])

export const validate_class_details = withErrorMessages([
    body('name')
        .notEmpty().withMessage('Class name is required!')
        .isIn(['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'])
        .withMessage('Invalid class name!'),
    
    body('class_arm')
        .notEmpty().withMessage('Class arm is required!')
        .isIn(['Galaxy', 'Platinum', 'Lincoln', 'Rose', 'Flamingo', 'MaryGold'])
        .withMessage('Invalid class arm!')
        .custom(async (value, {req}) => {
            const existingClass = await Class.findOne({name: req.body.name, class_arm: value})

            if(existingClass){
                throw new Error('Class name and Arm combination already exists!')
            }
        }),
    
    body('category')
        .notEmpty().withMessage('Category is required!')
        .isIn(['junior secondary', 'senior secondary'])
        .withMessage('Invalid class category!'),

    body('class_teacher')
        .optional()
        .isMongoId().withMessage('Invalid class teacher ID format!'),

    // body('students')
    //     .optional()
    //     .isArray().withMessage('Students should be an array!')
    //     .custom((value) => {
    //         return value.every(id => mongoose.isValidObjectId(id));
    //     }).withMessage('Invalid student ID format!'),
]);

export const validate_id_param = withErrorMessages([
    param("id")
        .isMongoId().withMessage("Not a valid ID!")
])