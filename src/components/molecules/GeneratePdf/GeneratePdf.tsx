import React, { useContext } from 'react';
import { saveAs } from 'file-saver';
import Button from '../../atoms/Button/Button';
import useError from '../../../hooks/useError';
import { Context } from '../../../providers/GeneralProvider';

function GeneratePdf() {
  const dataClient = {
    name: 'John',
    companyName: 'Super Company',
    email: 'company@gmail.com',
    addressCity: undefined,
    addressStreet: undefined
  };
  const servicesData = [
    {
      title: undefined || 'Website Design',
      price: undefined || '300.00'
    },
    {
      title: undefined || 'Hosting (3 months)',
      price: undefined || '75.00'
    }
  ];

  const htmlToDisplay = `<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>A simple, clean, and responsive HTML invoice template</title>

		<style>
			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}

			/** RTL **/
			.invoice-box.rtl {
				direction: rtl;
				font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
			}

			.invoice-box.rtl table {
				text-align: right;
			}

			.invoice-box.rtl table tr td:nth-child(2) {
				text-align: left;
			}
		</style>
	</head>

	<body>
		<div class="invoice-box">
			<table cellpadding="0" cellspacing="0">
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td class="title">
								  <img src="https://res.cloudinary.com/freelancerapp-dci/image/upload/v1647761192/AlpacaFolder/NS1blk_d0cnuq.png" style="width: 100%; max-width: 300px" />
								</td>
								<td>
									Invoice #: ${Date.now()}<br />
									Created: ${new Date().toLocaleDateString()}<br />
									Due: ${new Date(Date.now() + 1000 * 60 * 60 * 24 * 31).toLocaleDateString()}
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									Nomad Studio<br />
									12345 Sunny Road<br /> 
									Sunnyville, CA 12345
								</td>

								<td>
									${dataClient.companyName || 'Sparksuite, Inc.'}<br />
									${dataClient.addressCity || '32453 Chicago'}<br /> 
									${dataClient.addressStreet || 'Moon Street, US 32453'}
								</td>
							</tr>
						</table>
					</td>
				</tr>
       
				<tr class="heading">
					<td>Payment Method</td>

					<td>Type #</td>
				</tr>

				<tr class="details">
					<td>Transfer</td>

					<td>Money</td>
				</tr>

				<tr class="heading">
					<td>Item</td>

					<td>Price</td>
				</tr>
				
				${servicesData.map((item) => {
          return `<tr class="item">
            <td>${item.title}</td>
            <td>$${item.price}</td>
          </tr>`;
        })}

<!--				<tr class="item">-->
<!--					<td>Website design</td>-->

<!--					<td>$300.00</td>-->
<!--				</tr>-->

<!--				<tr class="item">-->
<!--					<td>Hosting (3 months)</td>-->

<!--					<td>$75.00</td>-->
<!--				</tr>-->

<!--				<tr class="item last">-->
<!--					<td>Domain name (1 year)</td>-->

<!--					<td>$10.00</td>-->
<!--				</tr>-->

				<tr class="total">
					<td></td>

					<td>Total: $${servicesData.reduce((a: number, b: any) => a + +b.price, 0)}</td>
				</tr>
			</table>
		</div>
	</body>
</html>`;

  const { handleError } = useError();
  const { userData } = useContext(Context);

  const handleGeneratePdf = () => {
    const generatePdf = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/pdf`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.token}`
          },
          body: JSON.stringify({ htmlToDisplay })
        });
        const resJSON = await res.json();
        if (res.status === 200) {
          handleError(resJSON.message || 'You generated correctly', true);
          saveAs(`${process.env.REACT_APP_BACKEND}/${resJSON.path}`, resJSON.fileName);
        } else {
          handleError(resJSON.message);
        }
      } catch (error: any) {
        console.log('FETCHING ERROR', error);
        handleError();
      }
    };
    generatePdf();
  };
  return (
    <Button
      type="button"
      text="Generate Pdf"
      width="auto"
      padding="0.7rem 1.4rem"
      onClick={handleGeneratePdf}
    />
  );
}

export default GeneratePdf;
