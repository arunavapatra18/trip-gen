"""Initial migration

Revision ID: 30fe37c0a08d
Revises: 
Create Date: 2025-04-26 09:59:07.575633

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '30fe37c0a08d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('trips',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.String(), nullable=False),
    sa.Column('source', sa.String(), nullable=False),
    sa.Column('destination', sa.String(), nullable=False),
    sa.Column('start_date', sa.String(), nullable=False),
    sa.Column('end_date', sa.String(), nullable=False),
    sa.Column('days_count', sa.Integer(), nullable=False),
    sa.Column('pax', sa.Integer(), nullable=False),
    sa.Column('trip_json', sa.Text(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('trips')
    # ### end Alembic commands ###
