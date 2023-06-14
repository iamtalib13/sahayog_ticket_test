// Copyright (c) 2023, Sid and contributors

// Hello from

frappe.ui.form.on("Sahayog Ticket", {
  dept_name: function (frm) {
    if (frm.doc.dept_name == "HR") {
    }
  },

  ticket_type_it: function (frm) {
    frm.refresh_field("ticket_type");
    frm.set_value("ticket_type", frm.doc.ticket_type_it);
    frm.refresh_field("ticket_type");

    // Clear existing options
    frm.set_df_property("tat", "options", "");
    // set new options
    frm.set_df_property("tat", "options", "3 Days\n2 Days\n1 Day\n4 Hours");
  },
  ticket_type_account: function (frm) {
    frm.refresh_field("ticket_type");
    frm.set_value("ticket_type", frm.doc.ticket_type_account);
    frm.refresh_field("ticket_type");
    // Clear existing options
    frm.set_df_property("tat", "options", "");
    // set new options
    frm.set_df_property("tat", "options", "3 Days\n2 Days\n1 Day\n4 Hours");
  },

  ticket_type_operations: function (frm) {
    frm.refresh_field("ticket_type");
    frm.set_value("ticket_type", frm.doc.ticket_type_operations);
    frm.refresh_field("ticket_type");
    // Clear existing options
    frm.set_df_property("tat", "options", "");
    // set new options
    frm.set_df_property("tat", "options", "3 Days\n2 Days\n1 Day\n4 Hours");
  },
  ticket_type_hr: function (frm) {
    if (
      frm.doc.ticket_type_hr === "Attendance" ||
      frm.doc.ticket_type_hr === "Medical Card" ||
      frm.doc.ticket_type_hr === "Leave"
    ) {
      frm.set_value("tat", "5 Days");
    } else {
      frm.set_value("tat", "15 Days");
    }

    frm.refresh_field("ticket_type");
    frm.set_value("ticket_type", frm.doc.ticket_type_hr);
    frm.refresh_field("ticket_type");
  },
  ticket_type_mis: function (frm) {
    frm.refresh_field("ticket_type");
    frm.set_value("ticket_type", frm.doc.ticket_type_mis);
    frm.refresh_field("ticket_type");
    // Clear existing options
    frm.set_df_property("tat", "options", "");
    // set new options
    frm.set_df_property("tat", "options", "3 Days\n2 Days\n1 Day\n4 Hours");
  },
  ticket_type_jll: function (frm) {
    frm.refresh_field("ticket_type");
    frm.set_value("ticket_type", frm.doc.ticket_type_jll);
    frm.refresh_field("ticket_type");
    // Clear existing options
    frm.set_df_property("tat", "options", "");
    // set new options
    frm.set_df_property("tat", "options", "3 Days\n2 Days\n1 Day\n4 Hours");
  },
  ticket_type_facility: function (frm) {
    frm.refresh_field("ticket_type");
    frm.set_value("ticket_type", frm.doc.ticket_type_facility);
    frm.refresh_field("ticket_type");

    // Clear existing options
    frm.set_df_property("tat", "options", "");
    // set new options
    frm.set_df_property("tat", "options", "3 Days\n2 Days\n1 Day\n4 Hours");
  },

  ticket_type_ho: function (frm) {
    frm.refresh_field("ticket_type");
    frm.set_value("ticket_type", frm.doc.ticket_type_ho);
    frm.refresh_field("ticket_type");

    // Clear existing options
    frm.set_df_property("tat", "options", "");
    // set new options
    frm.set_df_property("tat", "options", "3 Days\n2 Days\n1 Day\n4 Hours");
  },

  after_save: function (frm) {
    if (frm.doc.on_hold_time == frm.doc.due_time) {
      console.log("True");
      console.log(frm.doc.on_hold_time);
      console.log(frm.doc.due_time);
      var dept = frm.doc.dept_name;
      frm.set_value("status", "Open");
      msgprint("Ticket is Saved Successfully.");
      msgprint(dept + " Team will Contact You Shortly");
      frappe.set_route("List", "Sahayog Ticket");
    } else {
      console.log("False");
      console.log(frm.doc.on_hold_time);
      console.log(frm.doc.due_time);
    }

    if (frm.doc.status == "Closed") {
      frm.set_df_property("status", "read_only", 1);

      frm.set_df_property("assigned_it", "read_only", 1);

      frm.set_df_property("remark", "read_only", 1);

      msgprint("Ticket is Closed Successfully . .");
      frm.disable_save();
    }

    if (frm.doc.cancel_ticket == "Cancel Ticket") {
      frm.set_df_property("status", "read_only", 1);

      frm.set_df_property("assigned_it", "read_only", 1);

      msgprint("Ticket is Cancelled Successfully . .");
      frm.disable_save();
    }
  },
});

frappe.ui.form.on("Sahayog Ticket", {
  onload: function (frm) {
    let label;
    let color;
    if (frm.doc.status == "Open") {
      label = "Open";
      color = "red";
    } else if (frm.doc.status == "Read") {
      label = "Read";
      color = "orange";
    } else if (frm.doc.status == "In-Progress") {
      label = "In-Progress";
      color = "yellow";
    } else if (frm.doc.status == "On-Hold") {
      label = "On-Hold";
      color = "purple";
    } else if (frm.doc.status == "Closed") {
      label = "Closed";
      color = "green";
    } else if (frm.doc.status == "Cancelled") {
      label = "Cancelled";
      color = "grey";
    } else {
      // If the status is not recognized, set a default label and color
      label = frm.doc.status;
      color = "grey";
    }
    frm.page.set_indicator(__(label), color);
  },

  refresh: function (frm) {
    if (!frm.is_new()) {
      let emp_id = frm.doc.employee_id;
      let emp_name = frm.doc.employee_name;
      let emp_branch = frm.doc.branch_name;
      let emp_division = frm.doc.division;
      let emp_phone = frm.doc.phone1;

      let ticket_department = frm.doc.dept_name;
      let ticket_type = frm.doc.ticket_type;
      let ticket_description = frm.doc.description;

      var intro_owner =
        "<div style='display: flex;'>" +
        "<div style='flex: 1; padding: 5px; margin-right: 5px;'>" +
        "<table style='border-collapse: collapse; border: 1px solid black;'>" +
        "<tr>" +
        "<th colspan='2' style='text-align: left; border: 1px solid white; padding: 5px;'><b>Employee Details</b></th>" +
        "</tr>" +
        "<tr>" +
        "<td style='border: 1px solid white;'><b>Employee ID:</b></td>" +
        "<td style='border: 1px solid white;'>" +
        emp_id +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td style='border: 1px solid white;'><b>Employee Name:</b></td>" +
        "<td style='border: 1px solid white;'>" +
        emp_name +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td style='border: 1px solid white;'><b>Branch:</b></td>" +
        "<td style='border: 1px solid white;'>" +
        emp_branch +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td style='border: 1px solid white;'><b>Division:</b></td>" +
        "<td style='border: 1px solid white;'>" +
        emp_division +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td style='border: 1px solid white;'><b>Phone:</b></td>" +
        "<td style='border: 1px solid white;'>" +
        emp_phone +
        "</td>" +
        "</tr>" +
        "</table>" +
        "</div>" +
        "<div style='flex: 2; padding: 5px; margin-top: 5px;'>"; // Added margin-top

      var ticket_details =
        "<table style='border-collapse: collapse; border: 1px solid black; width: 100%;'>" +
        "<tr>" +
        "<th colspan='2' style='text-align: left; border: 1px solid white; padding: 5px;'><b>Ticket Details</b></th>" +
        "</tr>" +
        "<tr>" +
        "<td style='border: 1px solid white;'><b>Department:</b></td>" +
        "<td style='border: 1px solid white;'>" +
        ticket_department +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td style='border: 1px solid white;'><b>Ticket Type:</b></td>" +
        "<td style='border: 1px solid white;'>" +
        ticket_type +
        "</td>" +
        "</tr>" +
        "<tr>" +
        "<td style='border: 1px solid white;'><b>Ticket Description:</b></td>" +
        "<td style='border: 1px solid white;'>" +
        ticket_description +
        "</td>" +
        "</tr>" +
        "</table>";

      intro_owner += ticket_details + "</div></div>";

      frm.set_intro(intro_owner);
    }
    //----------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------
    let user = frappe.session.user;

    console.log("Logged-in-user = " + user);

    if (frm.is_new()) {
      let eid = user.match(/\d+/)[0];
      frm.set_value("employee_id", eid);
      console.log("ID SET");

      if (eid === frm.doc.employee_id) {
        console.log("matched employee" + eid);
        frm.toggle_display("employee_id", false);
        frm.toggle_display("status", false);
      }
    }
    if (!frm.is_new()) {
      let eid = user.match(/\d+/)[0];

      if (eid === frm.doc.employee_id) {
        console.log("matched employee" + eid);
        frm.toggle_display("employee_id", false);
        frm.toggle_display("status", false);
        frm.disable_save();
      }
    }
    if (frm.doc.dept_name == "" || null) {
      frm.doc.status = "New";
    }
    const onhold = 96;
    const onholdhit = 104;

    const normal = 72;
    const normalhit = 78;

    const medium = 48;
    const mediumhit = 54;

    const high = 24;
    const highhit = 28;

    const urgent = 4;
    const urgenthit = 6;

    //Start On-Hold Priority message
    if (
      frm.doc.total_hours < 104 &&
      frm.doc.total_hours >= onhold &&
      frm.doc.status == "On-Hold"
    ) {
      frappe.msgprint("On-Hold Ticket not Resolved in 96 Hours");
    }

    if (frm.doc.total_hours >= onholdhit && frm.doc.status == "On-Hold") {
      frappe.msgprint("On-Hold Ticket not Resolved in 104 Hours");
    }
    //End On-Hold Priority message

    //Start Urgent Priority message
    if (
      frm.doc.total_hours < 6 &&
      frm.doc.total_hours >= urgent &&
      frm.doc.priority == "Urgent"
    ) {
      frappe.msgprint("Ticket Priority was Urgent and not Resolved in 4 Hours");
    }

    if (frm.doc.total_hours >= urgenthit && frm.doc.priority == "Urgent") {
      frappe.msgprint("Ticket Priority was Urgent and not Resolved in 6 Hours");
    }
    //End Urgent Priority message

    //Start High Priority message
    if (
      frm.doc.total_hours < 28 &&
      frm.doc.total_hours >= high &&
      frm.doc.priority == "High"
    ) {
      frappe.msgprint("Ticket Priority was High and not Resolved in 24 Hours");
    }

    if (frm.doc.total_hours >= highhit && frm.doc.priority == "High") {
      frappe.msgprint("Ticket Priority was High and not Resolved in 28 Hours");
    }
    //End High Priority message

    //Start Medium Priority message
    if (
      frm.doc.total_hours < 54 &&
      frm.doc.total_hours >= medium &&
      frm.doc.priority == "Medium"
    ) {
      frappe.msgprint(
        "Ticket Priority was Medium and not Resolved in 48 Hours"
      );
    } else if (
      frm.doc.total_hours >= mediumhit &&
      frm.doc.priority == "Medium"
    ) {
      frappe.msgprint(
        "Ticket Priority was Medium and not Resolved in 54 Hours"
      );
    }
    //End Medium Priority message

    //Start Normal Priority message
    if (frm.doc.total_hours >= normalhit && frm.doc.priority == "Normal") {
      frappe.msgprint(
        "Ticket Priority was Normal and not Resolved in 78 Hours"
      );
    }
    if (
      frm.doc.total_hours < 78 &&
      frm.doc.total_hours >= normal &&
      frm.doc.priority == "Normal"
    ) {
      frappe.msgprint(
        "Ticket Priority was Normal and not Resolved in 72 Hours"
      );
    }
    //End Normal Priority message
  },
});

frappe.ui.form.on("Sahayog Ticket", {
  after_save: function (frm) {
    //frm.save();
  },
});
frappe.ui.form.on("Sahayog Ticket", {
  onload: function (frm) {
    if ((frm.doc.dept_name == null || "") && (frm.doc.desc == null || "")) {
      console.log("its blank");
    } else if (
      (!frm.doc.dept_name == null || "") &&
      (!frm.doc.desc == null || "")
    ) {
      frm.save();
    }

    if (frm.doc.status == "Closed" || frm.doc.status == "Cancelled") {
      frm.disable_save();
    } else if (frm.doc.status !== "Closed" || frm.doc.status !== "Cancelled") {
      frm.set_value("due_time", frappe.datetime.now_datetime());

      frm.set_value(
        "total_hours",
        frappe.datetime.get_hour_diff(frm.doc.due_time, frm.doc.on_hold_time)
      );

      frm.set_value(
        "total_days",
        frappe.datetime.get_day_diff(frm.doc.due_time, frm.doc.on_hold_time)
      );
    }

    if (frm.doc.status == "Open") {
      // frm.set_intro("Ticket Status : Open", "orange");
    }
    if (frm.doc.status == "Read") {
      //frm.set_intro("Ticket Status : Read", "blue");
    }

    if (frm.doc.status == "In-Progress") {
      // frm.set_intro("Ticket Status : In-Progress", "green");
    }
    if (frm.doc.status == "On-Hold") {
      //frm.set_intro("Ticket Status : On-Hold", "yellow");
    }
  },
});
