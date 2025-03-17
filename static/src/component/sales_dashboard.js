/** @odoo-module **/

import rpc from 'web.rpc';
import { registry } from "@web/core/registry";
const { Component } = owl;

export class OwlSaesDashboard extends Component {
    /**
     * Cette méthode Owl est appelée avant le rendu du composant.
     * On y fait l'appel RPC pour récupérer la somme des jours alloués.
     */
    async willStart() {
        // 1) Appeler le modèle `hr.leave.allocation` pour récupérer
        //    le nombre total de jours alloués
        const allocations = await rpc.query({
            model: 'hr.leave.allocation',
            method: 'search_read',
            args: [
                // Ajustez le domaine pour filtrer sur l’utilisateur courant
                // ou toute autre condition
                [],
                ['number_of_days'] // Champs dont on a besoin
            ],
        });

        // 2) Calculer la somme des jours alloués
        let totalAllocated = 0;
        allocations.forEach(record => {
            totalAllocated += record.number_of_days || 0;
        });

        // 3) Déterminer (à titre d’exemple) le nombre de jours pris et restant
        //    en vous basant sur d'autres appels RPC ou votre logique métier.
        //    Ici, on simule simplement des valeurs (à adapter selon vos besoins).
        let taken = 5;         // ex. : total de jours déjà pris
        let remaining = totalAllocated - taken; // jours restants

        // 4) Préparer les données à afficher dans le graphique
        this.data = [
            { conge: "Allocation", count: totalAllocated },
            { conge: "Pris",       count: taken },
            { conge: "Restant",    count: remaining },
        ];
    }

    /**
     * S’exécute lorsque le composant est monté dans le DOM
     */
    mounted() {
        // Récupérer le <canvas> depuis le DOM de ce composant
        const canvas = this.el.querySelector("canvas");

        // Construire le graphique en utilisant la liste `this.data`
        new Chart(canvas, {
            type: "bar",
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
