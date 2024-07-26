import fs from "fs";
import latex from "node-latex";
import path from "path";

interface formData {
  name: string;
  tenPercent: string;
  twelvePercent: string;
  email: string;
  skills: string;
  achievements: string;
}

export class formService {
  static async processForm(form: formData) {
    return await this.generatePdf(form);
  }

  private static async generatePdf(form: formData) {
    try {
      let templateData = fs.readFileSync(
        path.join(__dirname, "../utils/resumeTemplates/format1.tex"),
        "utf-8"
      );

      templateData = templateData.replace(/<<name>>/g, form.name);
      templateData = templateData.replace(/<<email>>/g, form.email);
      templateData = templateData.replace(/<<tenPercent>>/g, form.tenPercent);
      templateData = templateData.replace(
        /<<twelvePercent>>/g,
        form.twelvePercent
      );

      const skills = form.skills.split(",");
      let skillTmplt = "";
      skills.forEach((skill) => {
        skillTmplt += `\\item ${skill}\n`;
      });
      templateData = templateData.replace(/<<skills>>/g, skillTmplt);

      const achievements = form.achievements.split(",");
      let achievementsTmplt = "";
      achievements.forEach((achieve) => {
        achievementsTmplt += `\\item ${achieve}\n`;
      });
      templateData = templateData.replace(
        /<<achievements>>/g,
        achievementsTmplt
      );

      const outputPath = path.join(__dirname, "resume.pdf");
      const tempTexFile = path.join(__dirname, "temp_resume.tex");
      fs.writeFileSync(tempTexFile, templateData);

      return new Promise<string>((resolve, reject) => {
        const input = fs.createReadStream(tempTexFile);
        const output = fs.createWriteStream(outputPath);
        const pdf = latex(input);

        pdf.pipe(output);
        pdf.on("error", (err) => {
          console.error(err);
          reject(null);
        });
        pdf.on("finish", () => {
          console.log("PDF generated!");
          fs.unlinkSync(tempTexFile);
          resolve(outputPath);
        });
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      return null;
    }
  }
}
