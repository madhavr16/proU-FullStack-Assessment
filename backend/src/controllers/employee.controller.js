import Employee from "../models/Employee.js";

// CREATE
export const createEmployee = async (req, res) => {
  try {
    console.log("Body:", req.body);
    const employee = await Employee.create(req.body);
    res.json({ success: true, data: employee });
  } catch (error) {
    console.error("CREATE EMPLOYEE ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ (with search + pagination)
export const getEmployees = async (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;

  const query = {
    name: { $regex: search, $options: "i" },
  };

  const employees = await Employee.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Employee.countDocuments(query);

  res.json({
    success: true,
    data: employees,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  });
};

// READ ONE
export const getEmployeeById = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.json({ success: true, data: employee });
};

// UPDATE
export const updateEmployee = async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ success: true, data: updated });
};

// DELETE
export const deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Employee deleted" });
};
