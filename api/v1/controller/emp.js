const db_code = require("../db/db_code");
function empGet() {
  "Get the Dara";
  data = { apiV1: "get" };
  return data;
}

/**
 * Checking All Required is send through request.body
 * @param {Object} body Request.body
 * @returns {bool} `true` / `false`
 *
 * If No Error Return `true`
 * If Error Return `false`
 */
function check_each_key(body) {
  console.log(body);

  /**
   {
  "name": "",
  "phone": "",
  "email": "",
  "country": "",
  "date": "",
  "salary": 0,
  "region": "",
  "dept_id": 0,
  "role_id": 0
}
   * 
   */
  let empty_keyValue = {
    name: "",
    phone: "",
    email: "",
    country: "",
    date: "",
    salary: 0,
    region: "",
    dept_id: 0,
    role_id: 0,
  };

  for (const key in empty_keyValue) {
    if (key in body) {
      // const element = empty_keyValue[key];
      // console.log(key);
      empty_keyValue[key] = body[key];
      console.log(key, "In A Body");
    } else {
      console.log(key, "Not in Body");
      return false;
    }
  }
  return empty_keyValue;
}

/**
 * Get All Entries from DB Users
 * @param {Object} req
 * @param {Object} res
 */
async function empGetAll(req, res) {
  try {
    data = await db_code.db_getAll("employee_V1", "*");
    console.log(typeof data);
    console.log("I Get It");
    return await res.send({ j: data });
  } catch (error) {
    console.log(error);
    return res.send({ k: "Issue " });
  }
}

/**
 * List Of 10 Employees Users
 * @param {Object} req
 * @param {Object} res
 */
async function get_10_emp(req, res) {
  try {
    const users = await db_code.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Get One Entries from using `param:` id
 * @param {Object} req
 * @param {Object} res
 */
async function get_one(req, res) {
  try {
    const id = req.params.id;
    console.log(`Enter User ID ${id}`);
    const users = await db_code.db_getone("employee_V1", id);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Adding New Emp
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} `Status_code` and `Message`
 *
 * Logic Flow
 * - Taking Input from Request.body
 * - Check Data If Everything is Correct Send  status_code `200` Otherwise send `400`
 *
 * In Depth Corner Case :
 * 1. Case 1: No text In Body
 * 2. Case 2 : May Be Some Key and Values is Missing
 * 3. Case 3 : Inserting Into DB
 * Done
 */
async function add_emp(req, res) {
  console.log("Request body :", req.body);
  if (!Object.keys(req.body).length) {
    // Case 1: No text In Body
    console.log("Undefined and Status 400 Return");
    return res.status(400).json({
      status: 400,
      message: "Bad Request: Request body Not Exist",
    });
    // if Move for Futher Execution
  }
  console.log("Request Body Case 2");

  // Case 2 : May Be Some Key and Values is Missing
  /*
  Check Each Keys is Available Or Exist or Not
  */
  check_exist_key = check_each_key(req.body);
  if (check_exist_key === false) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request: Request body is missing",
    });
  }

  // Case 3 : Inserting Into DB

  // console.log(req.body.length);
  res.status(200).json({ status: 200 });
}

// Exporting all Function in JS
module.exports = { empGet, empGetAll, get_10_emp, get_one, add_emp };
