import { Request, Response } from "express";
import { client } from "../../../infra/prisma/client";

export default class CreateWebServicesObjController {
    static async handle(request: Request, response: Response) {
        const { data } = await request.body;
        const objJson = await JSON.parse(data);
        // await console.log(data);
        try {
            const webServiceObj = await client.webServiceObj.create({
                data: {
                    obj: data,
                    sql: "objJson.sql",
                    webservice_id: 1,
                    versao: 1,
                    status_id: 1,
                    table_id: 98,
                }
            });
            if (webServiceObj) {
                return response.json(
                    {
                        "msg" : "Successes"
                    }
                );
            }
        } catch (error) {
            return response.status(500).json({
                message: error
            });
        };
    };
};