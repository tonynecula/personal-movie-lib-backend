import { NextFunction, Request, Response } from "express";
import { MovieService } from "../../../service/movie-service";
import { errors } from "../../../util/constants";
import PDFDocument from "pdfkit";

export class ReportController {
  private movieService = new MovieService();

  public generateReport = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const movies = await this.movieService.getAll();
      console.log(movies);
      if (!movies || movies.length === 0) {
        const error = errors.notFound("movies");
        return next(error);
      }

      const doc = new PDFDocument();
      doc.font("Helvetica-Bold").fontSize(24).text("Movie Report", {
        align: "center",
      });

      doc.moveDown();

      movies.forEach((movie) => {
        doc.font("Helvetica").fontSize(12).text(`Title: ${movie.title}`);
        doc.font("Helvetica").fontSize(12).text(`Director: ${movie.director}`);
        doc
          .font("Helvetica")
          .fontSize(12)
          .text(`Year Released: ${movie.yearReleased}`);
        doc.font("Helvetica").fontSize(12).text(`Genre: ${movie.genre}`);
        doc.moveDown();
      });

      const fileName = "movie_report.pdf";
      res.attachment(fileName);
      doc.pipe(res);
      doc.end();
      return res.status(200).json();
    } catch (e) {
      return next(e);
    }
  };
  // public generateGraphPDF = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     // create a new PDF document
  //     const doc = new PDFDocument();

  //     // set the content type to PDF
  //     res.contentType("application/pdf");

  //     // set the filename of the PDF
  //     res.setHeader("Content-Disposition", 'attachment; filename="charts.pdf"');

  //     // set some chart data
  //     const data = {
  //       labels: [
  //         "January",
  //         "February",
  //         "March",
  //         "April",
  //         "May",
  //         "June",
  //         "July",
  //       ],
  //       datasets: [
  //         {
  //           label: "Sales",
  //           data: [65, 59, 80, 81, 56, 55, 40],
  //           backgroundColor: "rgba(255, 99, 132, 0.2)",
  //           borderColor: "rgba(255, 99, 132, 1)",
  //           borderWidth: 1,
  //         },
  //         {
  //           label: "Expenses",
  //           data: [28, 48, 40, 19, 86, 27, 90],
  //           backgroundColor: "rgba(54, 162, 235, 0.2)",
  //           borderColor: "rgba(54, 162, 235, 1)",
  //           borderWidth: 1,
  //         },
  //       ],
  //     };

  //     // set some chart options
  //     const options = {
  //       scales: {
  //         yAxes: [
  //           {
  //             ticks: {
  //               beginAtZero: true,
  //             },
  //           },
  //         ],
  //       },
  //     };

  //     // create a new canvas render service
  //     const canvasRenderService = new CanvasRenderService(800, 600);

  //     // create a new chart and render it to a canvas
  //     const chart1 = await canvasRenderService.renderToBuffer({
  //       type: "bar",
  //       data,
  //       options,
  //     });

  //     // add the chart to the PDF document
  //     doc.image(chart1, 0, 50, { width: 600 });

  //     // create another chart and render it to a canvas
  //     const chart2 = await canvasRenderService.renderToBuffer({
  //       type: "line",
  //       data,
  //       options,
  //     });

  //     // add the chart to the PDF document
  //     doc.image(chart2, 0, 400, { width: 600 });

  //     // pipe the PDF document to the response
  //     doc.pipe(res);

  //     // end the PDF document
  //     doc.end();
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send("An error occurred while generating the PDF.");
  //   }
  // };
}

export default new ReportController();
