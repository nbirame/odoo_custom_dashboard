# -*- coding: utf-8 -*-
{
    'name': 'Owl Dashboard',
    'version': '1.0',
    'summary': 'OWL BirTech',
    'sequence': -1,
    'description': """Dashboard congé""",
    'category': 'OWL',
    'depends': ['base', 'web', 'sale_management', 'board', 'hr_holidays'],
    'data': [
        'views/sales_dashboard.xml'
    ],
    'demo': [
    ],
    'installable': True,
    'application': True,
    'assets': {
            'web.assets_backend': [
                'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
                'odoo_custom_dashboard/static/src/component/sales_dashboard.js',
                'odoo_custom_dashboard/static/src/component/kpi_card/kpi_card.js'
                'odoo_custom_dashboard/static/src/components/**/*.scss',
                'odoo_custom_dashboard/static/src/component/chart_renderer/chart_renderer.js',

            ],
            'web.assets_qweb': [
                        'odoo_custom_dashboard/static/src/component/sales_dashboard.xml',
                        'odoo_custom_dashboard/static/src/component/chart_renderer/chart_renderer.xml',
                        'odoo_custom_dashboard/static/src/component/kpi_card/kpi_card.xml',
                    ],
        },
    'license': 'LGPL-3',
}
