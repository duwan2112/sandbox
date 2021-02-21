const express = require("express");
const router = express.Router();

const { getAllCampaigns } = require("../../database/campaign");
const { getAllUsers } = require("../../database/user");
const { getAllSessions } = require("../../database/sessions");

const user = require("../../database/user");

/**
 *
 *
 *  Campañas: {
 *    Ingreso Total
 *    Ingreso Mensual
 *    Cantidad Mensual
 *    Cantida  diaria
 *    Cantidad Pendientes
 *  }
 *
 */

const getStatsFromUsers = async (users) => {
  var totalIncome = 0;
  var monthlyIncome = 0;
  var totalCounter = 0;
  var monthlyCounter = 0;
  var dailyCounter = 0;

  var monthlyChurn = 0;
  var dailyChurn = 0;
  var totalChurn = 0;

  var monthlyUser = 0;
  var dailyUser = 0;
  var totalUser = 0;

  await users.forEach(async (user) => {
    // SI ESTA SUSCRIPTO
    if (user.sub) {
      totalCounter += 1;

      // On payments
      if (user.payments) {
        await user.payments.forEach(({ price, charge_date }) => {
          totalIncome += price;

          if (
            new Date(charge_date).getMonth() === new Date(Date.now()).getMonth()
          )
            monthlyIncome += price;
        });
      }

      // For Each Sub
      if (new Date(user.subDate).getMonth() === new Date(Date.now()).getMonth())
        monthlyCounter += 1;

      if (new Date(user.subDate).getDay() === new Date(Date.now()).getDay())
        dailyCounter += 1;
    }

    // SI ESTA DADO DE BAJA
    if (user.churn) {
      totalChurn += 1;

      if (new Date(user.churn).getMonth() === new Date(Date.now()).getMonth())
        monthlyChurn += 1;

      if (new Date(user.churn).getDay() === new Date(Date.now()).getDay())
        dailyChurn += 1;
    }

    // SI ES UN SIMPLE MORTAL
    if (new Date(user.createdAt).getMonth() === new Date(Date.now()).getMonth())
      monthlyUser += 1;

    if (new Date(user.createdAt).getDay() === new Date(Date.now()).getDay())
      dailyUser += 1;

    totalUser += 1;
  });

  return {
    subs: {
      totalIncome,
      monthlyIncome,
      totalCounter,
      monthlyCounter,
      dailyCounter,
    },
    churn: {
      monthlyChurn,
      dailyChurn,
      totalChurn,
    },
    user: {
      monthlyUser,
      dailyUser,
      totalUser,
    },
  };
};

router.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();

    if (users)
      return res.json({ ok: true, data: await getStatsFromUsers(users) });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      data: "Error al obtener las estadisticas de los usuarios",
    });
  }
});

const getStatsFromSessions = async (sessions) => {
  var totalIncome = 0;
  var monthlyIncome = 0;
  var monthlyCounter = 0;
  var dailyCounter = 0;
  var totalPendings = 0;

  await sessions.forEach((ses) => {
    totalIncome += ses.amount;

    if (!ses.done) {
      totalPendings += 1;
    }

    if (
      new Date(ses.createdAt).getMonth() === new Date(Date.now()).getMonth()
    ) {
      monthlyIncome += ses.amount;
      monthlyCounter += 1;
    }
    if (new Date(ses.createdAt).getDay() === new Date(Date.now()).getDay()) {
      dailyCounter += 1;
    }
  });

  return {
    totalIncome,
    monthlyIncome,
    monthlyCounter,
    dailyCounter,
    totalPendings,
  };
};

router.get("/sessions", async (req, res) => {
  try {
    const sessions = await getAllSessions();

    if (sessions)
      return res.json({ ok: true, data: await getStatsFromSessions(sessions) });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      data: "Error al obtener las estadisticas de las sesiones",
    });
  }
});

const getStatsFromCampaigns = async (camps) => {
  var total = camps.length;
  var totalIncome = 0;
  var monthlyIncome = 0;
  var monthlyCounter = 0;
  var dailyCounter = 0;
  var totalPendings = 0;

  await camps.forEach((camp) => {
    totalIncome += camp.invest;

    if (!camp.done) {
      totalPendings += 1;
    }

    if (
      new Date(camp.createdAt).getMonth() === new Date(Date.now()).getMonth()
    ) {
      monthlyIncome += camp.invest;
      monthlyCounter += 1;
    }
    if (new Date(camp.createdAt).getDay() === new Date(Date.now()).getDay()) {
      dailyCounter += 1;
    }
  });

  return {
    total,
    totalIncome,
    monthlyIncome,
    monthlyCounter,
    dailyCounter,
    totalPendings,
  };
};

router.get("/campaigns", async (req, res) => {
  try {
    const campaigns = await getAllCampaigns();

    if (campaigns)
      return res.json({
        ok: true,
        data: await getStatsFromCampaigns(campaigns),
      });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      data: "Error al obtener las estadisticas de las sesiones",
    });
  }
});

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const mineTheUsers = async (users, type) => {
  const years = [
    { name: "2020", cantidad: 0 },
    { name: "2021", cantidad: 0 },
    { name: "2022", cantidad: 0 },
    { name: "2023", cantidad: 0 },
    { name: "2024", cantidad: 0 },
    { name: "2025", cantidad: 0 },
  ];

  const months = [
    { name: "Enero", cantidad: 0 },
    { name: "Febrero", cantidad: 0 },
    { name: "Marzo", cantidad: 0 },
    { name: "Abril", cantidad: 0 },
    { name: "Mayo", cantidad: 0 },
    { name: "Junio", cantidad: 0 },
    { name: "Julio", cantidad: 0 },
    { name: "Agosto", cantidad: 0 },
    { name: "Septiembre", cantidad: 0 },
    { name: "Octubre", cantidad: 0 },
    { name: "Noviembre", cantidad: 0 },
    { name: "Diciembre", cantidad: 0 },
  ];

  const today = new Date(Date.now());
  const numberOfDays = daysInMonth(today.getMonth() + 1, today.getFullYear());
  const days = [];
  for (let index = 0; index < numberOfDays; index++) {
    days.push({ name: `Día ${index + 1}`, cantidad: 0 });
  }

  const data = {
    years,
    months,
    days,
  };

  users.forEach((user) => {
    if (user.sub && type === "subs") {
      data.years[
        new Date(user.subDate).getFullYear().toString()[3]
      ].cantidad += 1;

      if (new Date(user.subDate).getFullYear() === new Date().getFullYear())
        data.months[new Date(user.subDate).getMonth()].cantidad += 1;

      if (new Date(user.subDate).getMonth() === new Date().getMonth())
        data.days[new Date(user.subDate).getDate() - 1].cantidad += 1;
    }

    if (user.churn && type == "churn") {
      data.years[
        new Date(user.churn).getFullYear().toString()[3]
      ].cantidad += 1;

      if (new Date(user.churn).getFullYear() === new Date().getFullYear())
        data.months[new Date(user.churn).getMonth()].cantidad += 1;
      if (new Date(user.churn).getMonth() === new Date().getMonth())
        data.days[new Date(user.churn).getDate() - 1].cantidad += 1;
    }

    if (type === "users") {
      data.years[
        new Date(user.createdAt).getFullYear().toString()[3]
      ].cantidad += 1;
      if (new Date(user.createdAt).getFullYear() === new Date().getFullYear())
        data.months[new Date(user.createdAt).getMonth()].cantidad += 1;
      if (new Date(user.createdAt).getMonth() === new Date().getMonth())
        data.days[new Date(user.createdAt).getDate() - 1].cantidad += 1;
    }

    if (type === "income" && user.sub) {
      user.payments.forEach((payment) => {
        data.years[
          new Date(payment.charge_date).getFullYear().toString()[3]
        ].cantidad += payment.price;

        if (
          new Date(payment.charge_date).getFullYear() ===
          new Date().getFullYear()
        )
          data.months[new Date(payment.charge_date).getMonth()].cantidad +=
            payment.price;
        if (new Date(payment.charge_date).getMonth() === new Date().getMonth())
          data.days[new Date(payment.charge_date).getDate() - 1].cantidad +=
            payment.price;
      });
    }

    // Simple mortal
  });

  return { ...data };
};

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();

    if (users)
      return res.json({
        ok: true,
        data: {
          subs: await mineTheUsers(users, "subs"),
          churn: await mineTheUsers(users, "churn"),
          users: await mineTheUsers(users, "users"),
          income: await mineTheUsers(users, "income"),
        },
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      ok: false,
      data: "Error al obtener las estadisticas de las sesiones",
    });
  }
});

module.exports = router;
