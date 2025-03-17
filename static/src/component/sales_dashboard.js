/** @odoo-module **/

import rpc from 'web.rpc';
import { session } from '@web/session';
import { registry } from "@web/core/registry";
const { Component } = owl;

export class OwlSaesDashboard extends Component {
    setup() {
        this.alloca = 0;
        this.nbPris = 0;
        this.nbRestant = 0;
        this.pourCentPr = 0;
        this.pourCentRes = 0;
    }
    /**
     * Cette méthode Owl est appelée avant le rendu du composant.
     * On y fait les appels RPC pour récupérer les jours alloués et pris.
     */
    async willStart() {
        // Domaine pour l'utilisateur connecté
        const userDomain = [['employee_id.user_id', '=', session.uid]];

        //----------------------------------------------------------------------
        // 1) Somme des jours alloués (hr.leave.allocation)
        //----------------------------------------------------------------------
        const allocations = await rpc.query({
            model: 'hr.leave.allocation',
            method: 'search_read',
            args: [
                userDomain,
                ['number_of_days']
            ],
        });

        let totalAllocated = 0;
        allocations.forEach(record => {
            totalAllocated += record.number_of_days || 0;
        });

        //----------------------------------------------------------------------
        // 2) Somme des jours déjà pris (hr.leave)
        //    On filtre généralement sur l'état 'validate' (ou 'validate', 'validate1',
        //    selon votre workflow) pour comptabiliser les congés réellement utilisés.
        //----------------------------------------------------------------------
        const leaves = await rpc.query({
            model: 'hr.leave',
            method: 'search_read',
            args: [
                [...userDomain, ['state', '=', 'validate']],
                ['number_of_days']
            ],
        });

        let totalTaken = 0;
        leaves.forEach(record => {
            totalTaken += record.number_of_days || 0;
        });

        //----------------------------------------------------------------------
        // 3) Calculer le restant
        //----------------------------------------------------------------------
        let remaining = totalAllocated - totalTaken;

        //----------------------------------------------------------------------
        // 4) Préparer les données pour le graphique
        //----------------------------------------------------------------------
        this.data = [
            { conge: "Acquis", count: totalAllocated },
            { conge: "Déjà pris",       count: totalTaken },
            { conge: "Restants",    count: remaining },
        ];
        this.alloca = totalAllocated
        this.nbPris = totalTaken
        this.nbRestant = remaining
        this.pourCentPr = (100 * totalTaken)/totalAllocated
        this.pourCentRes = (100 * remaining)/totalAllocated

    }

    /**
     * S’exécute lorsque le composant est monté dans le DOM
     */
    mounted() {
        // Récupérer le <canvas> depuis le DOM de ce composant
        const canvas = this.el.querySelector("canvas");

        // Construire le graphique en utilisant la liste `this.data`
        new Chart(canvas, {
            type: "pie",
            data: {
                labels: this.data.map((row) => row.conge),
                datasets: [
                    {
                        label: "Tableau de bord congé",
                        data: this.data.map((row) => row.count),
                    },
                ],
            },
        });
    }
}

OwlSaesDashboard.template = "owl.OwlSalesDashboard";
registry.category("actions").add("owl.sales_dashboard", OwlSaesDashboard);