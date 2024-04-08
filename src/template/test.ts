export const testTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTDXHTML1.0Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml">

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<meta content="telephone=no" name="format-detection"/>
		<title></title>
		<link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
		<style>
			body {
				margin: 0;
				padding: 0;
				background-color: #f6f7f9;
				font-size: 14px;
				line-height: 171.4285714286%;
				mso-line-height-rule: exactly;
				color: #3a4859;
				width: 100%;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				-webkit-font-feature-settings: "cv02", "cv03", "cv04", "cv11";
				font-feature-settings: "cv02", "cv03", "cv04", "cv11"
			}
			@media only screen and(max-width:560px) {
				body {
					font-size: 14px !important
				}
			}
			body,
			table,
			td {
				font-family: Inter, -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif
			}
			table {
				border-collapse: collapse;
				width: 100%
			}
			table:not(.main) {
				-premailer-cellpadding: 0;
				-premailer-cellspacing: 0
			}
			.preheader {
				padding: 0;
				font-size: 0;
				display: none;
				max-height: 0;
				mso-hide: all;
				line-height: 0;
				color: transparent;
				height: 0;
				max-width: 0;
				opacity: 0;
				overflow: hidden;
				visibility: hidden;
				width: 0
			}
			.main {
				-webkit-text-size-adjust: 100%;
				-ms-text-size-adjust: 100%
			}
			.wrap {
				width: 100%;
				max-width: 640px;
				text-align: left
			}
			.box {
				background: #fff;
				border-radius: 4px;
				-webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, .05);
				box-shadow: 0 1px 4px rgba(0, 0, 0, .05);
				border: 1px solid #dce0e5
			}
			.box+.box {
				margin-top: 24px
			}
			.content {
				padding: 40px 48px
			}
			@media only screen and(max-width:560px) {
				.content {
					padding: 24px !important
				}
			}
			.h1,
			h1 {
				font-weight: 600;
				margin: 0 0 0.5em;
				color: #232b42
			}
			.h1 a,
			h1 a {
				color: inherit
			}
			.h1,
			h1 {
				font-size: 28px;
				line-height: 130%
			}
			@media only screen and(max-width:560px) {
				.h1,
				h1 {
					font-size: 24px !important
				}
			}
			img {
				border: 0 none;
				line-height: 100%;
				outline: 0;
				text-decoration: none;
				vertical-align: baseline;
				font-size: 0
			}
			a {
				color: #206bc4;
				text-decoration: none
			}
			a:hover {
				text-decoration: underline
			}
			a img {
				border: 0 none
			}
			strong {
				font-weight: 600
			}
			.table td {
				padding: 4px 12px
			}
			.table tr>td:first-child {
				padding-left: 0
			}
			.table tr>td:last-child {
				padding-right: 0
			}
			.btn {
				text-decoration: none;
				white-space: nowrap;
				font-weight: 500;
				font-size: 16px;
				padding: 12px 32px;
				border-radius: 4px;
				color: #fff;
				line-height: 100%;
				display: block;
				border: 1px solid transparent;
				-webkit-transition: 0.3s background-color;
				-o-transition: 0.3s background-color;
				transition: 0.3s background-color
			}
			.btn:hover {
				text-decoration: none
			}
			.btn-span {
				color: #fff;
				font-size: 16px;
				text-decoration: none;
				white-space: nowrap;
				font-weight: 500;
				line-height: 100%
			}
			.bg-body {
				background-color: #f6f7f9
			}
			.text-muted {
				color: #667382
			}
			.text-muted-light {
				color: #8491a1
			}
			.bg-blue {
				background-color: #206bc4;
				color: #fff
			}
			a.bg-blue:hover {
				background-color: #1e64b7 !important
			}
			.border-blue {
				border-color: #206bc4
			}
			.text-right {
				text-align: right
			}
			.text-center {
				text-align: center
			}
			.va-middle {
				vertical-align: middle
			}
			.img-illustration {
				max-width: 240px;
				max-height: 160px;
				width: auto;
				height: auto
			}
			.rounded {
				border-radius: 4px
			}
			table.rounded {
				border-collapse: separate
			}
			.w-auto {
				width: auto
			}
			.lh-1 {
				line-height: 100%
			}
			.border {
				border: 1px solid #dce0e5
			}
			.m-0 {
				margin: 0
			}
			.pb-0 {
				padding-bottom: 0
			}
			.p-sm {
				padding: 8px
			}
			.pt-sm {
				padding-top: 8px
			}
			.px-sm {
				padding-right: 8px
			}
			.px-sm {
				padding-left: 8px
			}
			.pt-md {
				padding-top: 16px
			}
			.pb-md {
				padding-bottom: 16px
			}
			.py-lg {
				padding-top: 24px
			}
			.px-lg {
				padding-right: 24px
			}
			.py-lg {
				padding-bottom: 24px
			}
			.px-lg {
				padding-left: 24px
			}
			.py-xl {
				padding-top: 48px
			}
			.py-xl {
				padding-bottom: 48px
			}
			.theme-dark .bg-body,
			.theme-dark.bg-body {
				background: #212936
			}
			.theme-dark .box {
				background: #2b3648;
				border-color: #2b3648;
				color: #ddd
			}
			.theme-dark .h1,
			.theme-dark h1 {
				color: #ddd
			}
			.theme-dark .border {
				border-color: #3e495b
			}
		</style>
		<style data-premailer="ignore">
			@media screen and(max-width: 600px) {
				u+.body {
					width: 100vw !important;
				}
			}

			a[x-apple-data-detectors] {
				color: inherit !important;
				text-decoration: none !important;
				font-size: inherit !important;
				font-family: inherit !important;
				font-weight: inherit !important;
				line-height: inherit !important;
			}
		</style>
		<!--[if mso]>
		      <style type="text/css">
		        body, table, td {
		        	font-family: Arial, Helvetica, sans-serif !important;
		        }
		
		        img {
		        	-ms-interpolation-mode: bicubic;
		        }
		
		        .box {
		        	border-color: #eee !important;
		        }
		      </style>
		    <![endif]-->
		<!--[if !mso]><!-->
		<link href="https://rsms.me/inter/inter.css" rel="stylesheet" type="text/css" data-premailer="ignore">
		<style type="text/css" data-premailer="ignore">
			@import url('https://rsms.me/inter/inter.css');
		</style>
		<!--<![endif]-->
		<link rel="stylesheet" href="./assets/theme.css"/>
	</head>

	<body class="bg-body theme-dark">
		<center>
			<table class="main bg-body" width="100%" cellspacing="0" cellpadding="0">
				<tr>
					<td
						align="center" valign="top">
						<!--[if (gte mso 9)|(IE)]>
						                <table border="0" cellspacing="0" cellpadding="0">
						                  <tr>
						                    <td align="center" valign="top" width="640">
						              <![endif]-->
						<span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
						<table class="wrap" cellspacing="0" cellpadding="0">
							<tr>
								<td class="p-sm">
									<table cellpadding="0" cellspacing="0">
										<tr>
											<td class="py-lg">
												<table cellspacing="0" cellpadding="0">
													<tr>
														<td>
															<a href="https://tabler.io/emails?utm_source=demo"><img src="./assets/sample-tabler-white.png" width="116" height="34" alt=""/></a>
														</td>
														<td class="text-right">
															<a href="https://tabler.io/emails?utm_source=demo" class="text-muted-light">
																View online
															</a>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
									<div class="main-content">
										<table class="box" cellpadding="0" cellspacing="0">
											<tr>
												<td>
													<table cellpadding="0" cellspacing="0">
														<tr>
															<td class="content pb-0" align="center">
																<h1 class="text-center m-0">{{name}} Save up to 40% on tabler.io! </h1>
															</td>
														</tr>
														<tr>
															<td class="content text-center">
																<img src="./assets/illustrations-undraw_wallet_aym5.png" alt="" height="160" class="img-illustration"/>
															</td>
														</tr>
														<tr>
															<td class="content text-center pt-sm">
																Get everything you need. If you
																<a href=".">upgrade now</a>, you'll save up to 40% off your subscription for the first year.<br>
																<strong>This offer ends on December 31th 2022</strong>
															</td>
														</tr>
														<tr>
															<td class="content pt-sm">
																<table cellspacing="0" cellpadding="0">
																	<tr>
																		<td align="center">
																			<table cellpadding="0" cellspacing="0" border="0" class="bg-blue rounded w-auto">
																				<tr>
																					<td align="center" valign="top" class="lh-1">
																						<a href="https://tabler.io/emails?utm_source=demo" class="btn bg-blue border-blue">
																							<span class="btn-span">Get&nbsp;my&nbsp;Discount</span>
																						</a>
																					</td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</table>
									</div>
									<table cellspacing="0" cellpadding="0">
										<tr>
											<td class="py-xl">
												<table class="text-center text-muted" cellspacing="0" cellpadding="0">
													<tr>
														<td align="center" class="pb-md">
															<table class="w-auto" cellspacing="0" cellpadding="0">
																<tr>
																	<td class="px-sm">
																		<a href="https://tabler.io/emails?utm_source=demo">
																			<img src="./assets/icons-gray-brand-facebook.png" class=" va-middle" width="24" height="24" alt="brand-facebook"/>
																		</a>
																	</td>
																	<td class="px-sm">
																		<a href="https://tabler.io/emails?utm_source=demo">
																			<img src="./assets/icons-gray-brand-twitter.png" class=" va-middle" width="24" height="24" alt="brand-twitter"/>
																		</a>
																	</td>
																	<td class="px-sm">
																		<a href="https://tabler.io/emails?utm_source=demo">
																			<img src="./assets/icons-gray-brand-github.png" class=" va-middle" width="24" height="24" alt="brand-github"/>
																		</a>
																	</td>
																	<td class="px-sm">
																		<a href="https://tabler.io/emails?utm_source=demo">
																			<img src="./assets/icons-gray-brand-youtube.png" class=" va-middle" width="24" height="24" alt="brand-youtube"/>
																		</a>
																	</td>
																	<td class="px-sm">
																		<a href="https://tabler.io/emails?utm_source=demo">
																			<img src="./assets/icons-gray-brand-pinterest.png" class=" va-middle" width="24" height="24" alt="brand-pinterest"/>
																		</a>
																	</td>
																	<td class="px-sm">
																		<a href="https://tabler.io/emails?utm_source=demo">
																			<img src="./assets/icons-gray-brand-instagram.png" class=" va-middle" width="24" height="24" alt="brand-instagram"/>
																		</a>
																	</td>
																</tr>
															</table>
														</td>
													</tr>
													<tr>
														<td class="px-lg">
															If you have any questions, feel free to message us at
															<a href="mailto:support@tabler.io" class="text-muted">support@tabler.io</a>.
														</td>
													</tr>
													<tr>
														<td class="pt-md">
															You are receiving this email because you have bought or downloaded one of the Tabler products.
															<a href="https://tabler.io/emails?utm_source=demo" class="text-muted">Unsubscribe</a>
														</td>
													</tr>
												</table>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
						<!--[if (gte mso 9)|(IE)]>
						              </td>
						            </tr>
						          </table>
						              <![endif]-->
					</td>
				</tr>
			</table>
		</center>
	</body>

</html>
`;
