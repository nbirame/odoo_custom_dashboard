# -*- coding: utf-8 -*-
{
    'name': 'Owl Conge',
    'version': '1.0',
    'summary': 'OWL BirTech',
    'sequence': -1,
    'description': """Dashboard congé""",
    'category': 'OWL',
    'depends': ['base', 'web', 'board', 'hr_holidays'],
    'data': [
        'views/conge_view_dashboard.xml'
    ],
    'demo': [
    ],
    'installable': True,
    'application': True,
    'assets': {
            'web.assets_backend': [
                'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js',
                'odoo_custom_dashboard/static/src/component/conge_dashboard.js',
                'odoo_custom_dashboard/static/src/components/**/*.scss',

            ],
            'web.assets_qweb': [
                        'odoo_custom_dashboard/static/src/component/conge_dashboard.xml',
                    ],
        },
    'license': 'LGPL-3',
}
