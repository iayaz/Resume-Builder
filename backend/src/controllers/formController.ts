import { Request, Response } from "express";
import { formService } from "../services/formService";

export class formController {
  static async submit(req: Request, res: Response) {
    const { form } = req.body;
    if (!form) {
      return res.status(400).json({ msg: "Form Data is not present" });
    }

    const path = await formService.processForm(form);

    if (!path) {
      return res.status(500).json({ msg: "Error generating PDF" });
    }

    res.status(200).download(path);
  }
}
