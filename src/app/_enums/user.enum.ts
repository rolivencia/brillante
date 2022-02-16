export enum EUserRole {
    ADMIN = 1,
    OWNER = 2,
    COUNTER_CLERK = 3,
    REPAIRMAN = 4,
    CUSTOMER = 5,
    EMPLOYEE = 6,
    ACCOUNTANT = 7,
}

export enum EUSerRoles {
    ADMIN = 100,

    CAN_ACCESS_CUSTOMERS = 200,
    CAN_CREATE_CUSTOMERS = 201,
    CAN_UPDATE_CUSTOMERS = 202,
    CAN_DELETE_CUSTOMERS = 203,

    CAN_ACCESS_REPAIRS = 300,
    CAN_CREATE_REPAIRS = 301,
    CAN_UPDATE_REPAIRS = 302,
    CAN_DELETE_REPAIRS = 303,

    CAN_ACCESS_CASH = 400,
    CAN_CREATE_CASH = 401,
    CAN_UPDATE_CASH = 402,
    CAN_DELETE_CASH = 403,
    CAN_ACCESS_CONCEPTS_DASHBOARD = 404,
    CAN_ACCESS_REPORTS = 405,
    CAN_VIEW_PAST_TRANSACTIONS = 406,

    CAN_ACCESS_STOCK = 500,
    CAN_CREATE_STOCK = 501,
    CAN_UPDATE_STOCK = 502,
    CAN_DELETE_STOCK = 503,

    CAN_ACCESS_STORE = 600,
    CAN_CREATE_STORE = 601,
    CAN_UPDATE_STORE = 602,
    CAN_DELETE_STORE = 603,
}
